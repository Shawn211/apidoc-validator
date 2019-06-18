'use strict';

const Mock = require('mockjs');

const generator = async (type) => {
    // type示例: 
    // let type = {
    //     'name': 'string',
    //     'age': 'integer',
    //     'height': 'number',
    //     'health': 'boolean',
    //     'comment': 'object[]',
    //     'comment.imgId': 'string[]',
    //     'comment.status': 'integer[]',
    //     'comment.price': 'number[]',
    //     'comment.new': 'boolean[]',
    //     'comment.like': 'object',
    //     'comment.like.count': 'string',
    //     'abc': 'object[][][]',
    //     'abc.a': 'string',
    //     'abc.b': 'string',
    //     'abc.c': 'string',
    // };
    let mock = await getMock(type);
    let data = Mock.mock(mock);
    // console.log(data);
    return data;
};

const getMock = async (type) => {
    let mock = {};
    for (let key in type) {
        // 当且仅当在这一层次上的key才进行Mock获取
        if (!Object.keys(type).includes(key.split('.').slice(0, key.split('.').length-1).join('.'))) {
            if (/\[\]/.test(type[key])) {
                if (/\[\]\[\]$/.test(type[key])) {
                    // Mock不能直接生成数组数组，所以先生成一个对象，获取其为数组的值，再对各数组值进行元素数组的生成
                    // 即: {abc: 'object[][]'} => {'abc|1-10': ['object[]']} =Mock.mock=> {'abc': ['object[]', 'object[]']}
                    let arrayObject = Mock.mock({[`${key.split('.').pop()}|1-10`]: [type[key].slice(0, type[key].length-2)]});
                    for (let index in arrayObject[key.split('.').pop()]) {
                        let _type = {};
                        if (/object/.test(type[key])) {
                            Object.keys(type).map(x => {
                                if (RegExp(key+'.').test(x)) {
                                    _type[x.replace(key, key.split('.').pop())] = type[x];
                                }
                            });
                        }
                        _type[key.split('.').pop()] = arrayObject[key.split('.').pop()][index];
                        let typeObject = await getMock(_type);
                        let arrayObject2 = Mock.mock(typeObject);
                        arrayObject[key.split('.').pop()][index] = arrayObject2[key.split('.').pop()];
                    }
                    mock[key.split('.').pop()] = arrayObject[key.split('.').pop()];
                } else if (/object/.test(type[key])) {
                    let _type = {};
                    Object.keys(type).map(x => {
                        if (RegExp(key+'.').test(x)) {
                            _type[x] = type[x];
                            delete type[x];
                        }
                    });
                    let typeObject = await getMock(_type);
                    mock[`${key.split('.').pop()}|1-10`] = [typeObject];
                } else {
                    let typeObject = await getMock({[key.split('.').pop()]: type[key].replace(/\[\]/g, '')});
                    mock[`${key.split('.').pop()}|1-10`] = [typeObject[key.split('.').pop()]];
                }
            } else if (/object/.test(type[key])) {
                let _type = {};
                Object.keys(type).map(x => {
                    if (RegExp(key+'.').test(x)) {
                        _type[x] = type[x];
                        delete type[x];
                    }
                });
                mock[key.split('.').pop()] = await getMock(_type);
            } else {
                // 暂且适应目前类型number为浮点型
                mock[key.split('.').pop()] = `@${type[key] == 'number' ? 'float' : type[key]}`;
                if (type[key] == 'number') {
                    mock[key.split('.').pop()] += '(0, 1000)';
                } else if (type[key] == 'integer') {
                    mock[key.split('.').pop()] += '(-3, 100)';
                }
            }
        }
    }
    return mock;
}

module.exports = generator;

generator();