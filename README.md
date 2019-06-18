# apidoc-validator
### 实现利用 apiDoc 生成的 Json 文件，校验请求参数的中间件

---
### 实现利用 apiDoc 生成的 Json 文件，自动生成对应类型数据返回的中间件
<pre><code>Type Demo
{
    'name': 'string',
    'age': 'integer',
    'height': 'number',
    'health': 'boolean',
    'comment': 'object[]',
    'comment.imgId': 'string[]',
    'comment.status': 'integer[]',
    'comment.price': 'number[]',
    'comment.new': 'boolean[]',
    'comment.like': 'object',
    'comment.like.count': 'string',
    'abc': 'object[][][]',
    'abc.a': 'string',
    'abc.b': 'string',
    'abc.c': 'string',
}
</code></pre>
<details>
<summary>Mock 随机生成数据</summary>
<pre><code>{
    "name": "k[Nt",
    "age": 10,
    "height": 265.01438871476,
    "health": false,
    "comment": [
        {
            "imgId": [
                "agj4$",
                ")8x2",
                "Fnb7(q",
                "IohD"
            ],
            "status": [
                89
            ],
            "price": [
                737.84442084654,
                716.3234966818933
            ],
            "new": [
                false,
                true,
                false,
                false
            ],
            "like": {
                "count": "P#s^zCc"
            }
        },
        {
            "imgId": [
                "X[PT",
                "j%phki",
                "S!8iw",
                "@2g"
            ],
            "status": [
                37,
                -1,
                74,
                1,
                3,
                78,
                79,
                51,
                48,
                1
            ],
            "price": [
                412.949514,
                85.47636115722476,
                592.03513718,
                786.674,
                721.205074,
                351.7,
                159.11361541,
                911.3031072
            ],
            "new": [
                false,
                true
            ],
            "like": {
                "count": "OjWSI"
            }
        },
        {
            "imgId": [
                ")QOYH",
                "by#S",
                "BB4nc1"
            ],
            "status": [
                9
            ],
            "price": [
                197.063786,
                53.838354,
                579.99
            ],
            "new": [
                true,
                true,
                false,
                true
            ],
            "like": {
                "count": "dnSp"
            }
        },
        {
            "imgId": [
                "Z%5",
                "E^Hp",
                "Af^qqO"
            ],
            "status": [
                44,
                17,
                40,
                54,
                8,
                20,
                1,
                4,
                42,
                18
            ],
            "price": [
                352.448677074,
                603.32155135,
                824.1336691979365
            ],
            "new": [
                true,
                true,
                false,
                true,
                false,
                true
            ],
            "like": {
                "count": "FFxG"
            }
        },
        {
            "imgId": [
                "L(^p6",
                "MO#",
                "lHBPLL"
            ],
            "status": [
                66,
                4,
                61,
                83
            ],
            "price": [
                293.03498567263256,
                47.757811804232,
                219.212139665295,
                733.9887
            ],
            "new": [
                true,
                true,
                true,
                false,
                true,
                false,
                false,
                true
            ],
            "like": {
                "count": "y%@Ah"
            }
        },
        {
            "imgId": [
                "ymC",
                "8#Rb",
                "SNQ1",
                "iS0PC@",
                "pbY2fjq",
                "Rlxtc61",
                "ai1B0^z",
                "(8Myl",
                "n^rc9%"
            ],
            "status": [
                36,
                35,
                -3,
                96,
                25,
                18,
                38,
                19,
                66
            ],
            "price": [
                928.0983468431887
            ],
            "new": [
                false,
                false,
                false,
                false,
                false,
                false,
                true,
                true,
                true
            ],
            "like": {
                "count": "pe37o@"
            }
        },
        {
            "imgId": [
                "u%4t#",
                "r2KyZq",
                "7rK1",
                "(l3",
                "[FocQ"
            ],
            "status": [
                25,
                0,
                10,
                2,
                82,
                51
            ],
            "price": [
                869.386113261426,
                338.7932747,
                391.8
            ],
            "new": [
                true,
                false,
                false,
                true,
                true
            ],
            "like": {
                "count": "3OLD(dl"
            }
        }
    ],
    "abc": [
        [
            [
                {
                    "a": "O(TP",
                    "b": "dfXBL",
                    "c": "PIt"
                },
                {
                    "a": "q[6",
                    "b": "(#*6K",
                    "c": "Q9I"
                },
                {
                    "a": "3IsS",
                    "b": "*bBoP",
                    "c": "!coA"
                },
                {
                    "a": "wOj",
                    "b": "]JOhd74",
                    "c": "56oG(T"
                },
                {
                    "a": "4yAu1",
                    "b": "bO1S6",
                    "c": "iWLlh"
                },
                {
                    "a": "F#em",
                    "b": "0AJJ",
                    "c": "OGqc"
                },
                {
                    "a": "rkVp",
                    "b": "ACMGy)",
                    "c": "w(#est"
                },
                {
                    "a": "262jB",
                    "b": "%0VjDmK",
                    "c": "ZrY"
                },
                {
                    "a": "IAzY",
                    "b": "hiqEd",
                    "c": "c@o"
                }
            ],
            [
                {
                    "a": "!26@",
                    "b": "([PiXOh",
                    "c": "sRa!gn"
                },
                {
                    "a": "VP0",
                    "b": "7WtoIF",
                    "c": "tym@"
                },
                {
                    "a": "^sR1",
                    "b": "2KgrWCn",
                    "c": "yIFr"
                }
            ],
            [
                {
                    "a": "xN**3b#",
                    "b": "hqeYfq",
                    "c": "!TJCl"
                },
                {
                    "a": "ddyY$#W",
                    "b": "DDmw",
                    "c": "(Xmx"
                },
                {
                    "a": "ha7",
                    "b": "^1A70r",
                    "c": "BvBveHq"
                }
            ],
            [
                {
                    "a": "foH8[m",
                    "b": "o)Bgyu",
                    "c": "RxsIA"
                },
                {
                    "a": "JibMi!",
                    "b": "kX%iE$",
                    "c": "9AsY2"
                }
            ],
            [
                {
                    "a": "DhuL@i",
                    "b": "wgiK",
                    "c": "5ABA"
                },
                {
                    "a": "oeh]$UG",
                    "b": "tv7",
                    "c": "XQHbh"
                },
                {
                    "a": "rqz^H",
                    "b": "rwVp",
                    "c": "BV43$"
                },
                {
                    "a": "QbP",
                    "b": "DgOCfd",
                    "c": "vV[!"
                },
                {
                    "a": "o%s4#7",
                    "b": "%DSvT]",
                    "c": "uDlFw"
                }
            ],
            [
                {
                    "a": "Ggh&z",
                    "b": "C^#M*",
                    "c": "13stLG"
                },
                {
                    "a": "O*0lr",
                    "b": "[QFp",
                    "c": "&NO$ZZ"
                },
                {
                    "a": "cVW",
                    "b": "sYX0Ix",
                    "c": "ab4D"
                },
                {
                    "a": "uU5&v",
                    "b": "ylkh",
                    "c": "pCyj"
                },
                {
                    "a": "!b!AT",
                    "b": "gPLDH",
                    "c": "j88G$"
                }
            ],
            [
                {
                    "a": "XLF#",
                    "b": "^OFAzc",
                    "c": "N!cnKh"
                },
                {
                    "a": "kO@7",
                    "b": "KRxv",
                    "c": "A[YeJ"
                }
            ],
            [
                {
                    "a": "FfBo",
                    "b": "kXV",
                    "c": "&Z7"
                },
                {
                    "a": "L10Kj$",
                    "b": "kD0",
                    "c": "fBLPJ"
                },
                {
                    "a": "vIwJ",
                    "b": "HPFUw",
                    "c": "(KyXo"
                }
            ],
            [
                {
                    "a": "ed&G",
                    "b": "oZ%tQ",
                    "c": "(CO@0#"
                },
                {
                    "a": "ZqfsRo",
                    "b": ")HTqS4",
                    "c": "Mp$HW!"
                },
                {
                    "a": "WmnO!H",
                    "b": "Qi8",
                    "c": "KRbRK"
                },
                {
                    "a": "M6cI1A@",
                    "b": "unVS",
                    "c": "fAJA"
                },
                {
                    "a": "oO4&1j",
                    "b": "zJ1",
                    "c": "uGS!1x"
                }
            ]
        ],
        [
            [
                {
                    "a": "6L%n@",
                    "b": "#Ql[p",
                    "c": "6rg"
                },
                {
                    "a": "vBp",
                    "b": "y5)i]7",
                    "c": "NPc"
                }
            ],
            [
                {
                    "a": "2)N0G",
                    "b": "cZv]K",
                    "c": "@re5C"
                },
                {
                    "a": "bNpId(",
                    "b": "mK%!dg",
                    "c": "tlhLM"
                },
                {
                    "a": "%DAM",
                    "b": "iDiz",
                    "c": "J^f6"
                },
                {
                    "a": "I*!L",
                    "b": "F@gIB",
                    "c": "RA$"
                },
                {
                    "a": "uspzH6",
                    "b": "FZ7kDUk",
                    "c": "X4Bh"
                },
                {
                    "a": "TGLjYpg",
                    "b": "^G]j",
                    "c": "(V^Kg"
                }
            ],
            [
                {
                    "a": "#PA#Z",
                    "b": "gK3*1H",
                    "c": "tlm&"
                },
                {
                    "a": "5rob)",
                    "b": "F(HF",
                    "c": "YOMm"
                },
                {
                    "a": "QQLlUo",
                    "b": "3!ydd",
                    "c": "UcKq"
                },
                {
                    "a": "!njMs",
                    "b": "PlnN",
                    "c": "pU2R"
                },
                {
                    "a": "hV7&",
                    "b": "@H%GJ[",
                    "c": "3d51*h"
                },
                {
                    "a": "^Vfr",
                    "b": "rOpcY",
                    "c": "saTqb"
                },
                {
                    "a": "J3qQi",
                    "b": "&FEhex",
                    "c": "@fqliqF"
                },
                {
                    "a": "Cze",
                    "b": "tpLU",
                    "c": "c9tEO"
                },
                {
                    "a": "5cit#u",
                    "b": "WmD",
                    "c": ")Pm*T"
                },
                {
                    "a": "zDjO$",
                    "b": "tGb[",
                    "c": "Fxrde"
                }
            ],
            [
                {
                    "a": "FAy",
                    "b": "M%84oL",
                    "c": "fX[5"
                },
                {
                    "a": "yO@BF",
                    "b": "u08M",
                    "c": "NJnl"
                },
                {
                    "a": "c9))^X",
                    "b": "DylX",
                    "c": "D^C"
                },
                {
                    "a": "Ak*",
                    "b": "lwq8x8",
                    "c": "#VP#B"
                },
                {
                    "a": "80H^eK",
                    "b": "pVY",
                    "c": "MKA4F#"
                },
                {
                    "a": "C(p&yx",
                    "b": "mqTV",
                    "c": "BEKU"
                },
                {
                    "a": "MeiK",
                    "b": "0e5v",
                    "c": "6UIch"
                }
            ],
            [
                {
                    "a": "HvfJ",
                    "b": "sKranq",
                    "c": "BwdvYq4"
                },
                {
                    "a": "Y9x",
                    "b": "$VZ4",
                    "c": "^CHdgFf"
                }
            ],
            [
                {
                    "a": "GLVf",
                    "b": "]^$9R",
                    "c": "yD8I"
                },
                {
                    "a": "tB5G8!",
                    "b": "QgA&RM",
                    "c": "#Ro@!k"
                },
                {
                    "a": "MKMDD",
                    "b": "X64#AJ",
                    "c": "l8pzHq"
                },
                {
                    "a": "V$iPF",
                    "b": "At865TK",
                    "c": "4&BSvM["
                },
                {
                    "a": "ITsFg",
                    "b": "&Zu",
                    "c": "z)RZ"
                }
            ],
            [
                {
                    "a": "a!]CO",
                    "b": "nnAFt",
                    "c": "(BuMC3"
                },
                {
                    "a": "#cKP",
                    "b": "VTp",
                    "c": "R7^#E"
                },
                {
                    "a": "sAv7j",
                    "b": "Pj)Lsj",
                    "c": "dU0w"
                },
                {
                    "a": "243s@",
                    "b": "0)3p&#",
                    "c": "SKh&y&"
                },
                {
                    "a": "Lbwht",
                    "b": "4hL[65F",
                    "c": "1!M"
                }
            ],
            [
                {
                    "a": "D)RF",
                    "b": ")hgZL",
                    "c": "gHKqfl"
                },
                {
                    "a": "RmCz",
                    "b": "$Ch0OH",
                    "c": "@j32gd"
                },
                {
                    "a": "@45l&@p",
                    "b": "I*5^jXp",
                    "c": "4jTn"
                }
            ],
            [
                {
                    "a": "n@1cgb",
                    "b": "M8e",
                    "c": "L[H[f2d"
                },
                {
                    "a": "KW7#i",
                    "b": "FUAOmf",
                    "c": "NF^AHgu"
                },
                {
                    "a": "Oz)XVS",
                    "b": "w*8qc",
                    "c": "s)fFbW"
                },
                {
                    "a": "!Sh9",
                    "b": "2vd4",
                    "c": "2pnC"
                },
                {
                    "a": "BN)",
                    "b": "4qPoT",
                    "c": "5G[LGl"
                },
                {
                    "a": "@D9O52",
                    "b": "Q1gkS",
                    "c": "GB(5n"
                },
                {
                    "a": "huWcMH",
                    "b": "O2&0e",
                    "c": "QByoi8"
                },
                {
                    "a": "rDv1s",
                    "b": "7L7M",
                    "c": "cN3"
                },
                {
                    "a": "3)nh",
                    "b": "w3j2D",
                    "c": "NMMI@"
                },
                {
                    "a": "nNKL^4",
                    "b": "@&6i1E",
                    "c": "DjVnLn"
                }
            ],
            [
                {
                    "a": "eXVil$",
                    "b": "B*mg",
                    "c": "Joc7N"
                },
                {
                    "a": "1%Fy6",
                    "b": "$ea",
                    "c": "keo"
                }
            ]
        ],
        [
            [
                {
                    "a": "[c8i",
                    "b": "UqB*",
                    "c": "XcHxIgn"
                },
                {
                    "a": "5w^!",
                    "b": "Hq@",
                    "c": "xpk*YQ"
                },
                {
                    "a": "uPL1",
                    "b": "@0km",
                    "c": "in5oG"
                },
                {
                    "a": "pFQW%",
                    "b": "jhi",
                    "c": "0^J"
                },
                {
                    "a": "q7lD",
                    "b": "qUHP",
                    "c": "^ebX"
                },
                {
                    "a": "avfNT",
                    "b": "jO@*",
                    "c": "aNs"
                },
                {
                    "a": "enKP",
                    "b": "!o!3J",
                    "c": "B3MjQ"
                }
            ],
            [
                {
                    "a": "1nQrBe(",
                    "b": "XVoGGz",
                    "c": "Ju$j"
                },
                {
                    "a": "%*A",
                    "b": "BD^g5",
                    "c": "tuyF"
                }
            ],
            [
                {
                    "a": "6n3HpR",
                    "b": "16wpDQ",
                    "c": "01RA*"
                },
                {
                    "a": "1P]^@",
                    "b": "223L#n",
                    "c": "DJBf"
                },
                {
                    "a": "uggSe",
                    "b": "sF[Y",
                    "c": "h*crgU"
                }
            ],
            [
                {
                    "a": "KkY%lb",
                    "b": "]tvfo",
                    "c": "NUd"
                },
                {
                    "a": "qpXJ^MG",
                    "b": "ZDo",
                    "c": "Mczc[FJ"
                },
                {
                    "a": "o@Zq",
                    "b": "i57w[",
                    "c": ")YZc"
                },
                {
                    "a": "viBN",
                    "b": "DPl^@*E",
                    "c": "h&COQ"
                }
            ]
        ],
        [
            [
                {
                    "a": "@p8",
                    "b": "yxPu0C",
                    "c": "&fIv"
                },
                {
                    "a": "u*aF",
                    "b": "zl]#nV",
                    "c": "chwXge"
                }
            ],
            [
                {
                    "a": "KQMCI2",
                    "b": "87bjN",
                    "c": "PeHK"
                },
                {
                    "a": "v1sY",
                    "b": "ysh",
                    "c": "BYVm)B"
                },
                {
                    "a": "Tgrl",
                    "b": "iLVx",
                    "c": "2qP8"
                },
                {
                    "a": "PlF[Cx",
                    "b": "J)lu7",
                    "c": "lEGI"
                },
                {
                    "a": "XNi",
                    "b": "NWS@V3",
                    "c": "3Eq3z"
                },
                {
                    "a": "wo5",
                    "b": "%EJ[",
                    "c": "SpG8UQz"
                },
                {
                    "a": "%7SW",
                    "b": "J1iUHe",
                    "c": "wdM)H"
                }
            ],
            [
                {
                    "a": "cyDr",
                    "b": "9AC3#",
                    "c": "hcmFe"
                },
                {
                    "a": "$0McW",
                    "b": "EnuC",
                    "c": "H7Gtq^"
                },
                {
                    "a": "W5@l",
                    "b": "YZp9",
                    "c": "Zr*bW"
                },
                {
                    "a": "tk(E",
                    "b": "iqXN",
                    "c": "t2G$"
                }
            ],
            [
                {
                    "a": "foB!v",
                    "b": "zAL",
                    "c": "owm2V"
                },
                {
                    "a": "4^*Cw",
                    "b": "8sbS",
                    "c": "urzpS"
                }
            ],
            [
                {
                    "a": "XCMI",
                    "b": "3Uy8",
                    "c": "QzH"
                },
                {
                    "a": "VTeiT",
                    "b": "2r%",
                    "c": "b@tZ&"
                },
                {
                    "a": "mvHH",
                    "b": "B2KK",
                    "c": "lswTK"
                }
            ],
            [
                {
                    "a": "Du$",
                    "b": "sK%S9",
                    "c": "nq0Ee"
                },
                {
                    "a": "Ey*wxg",
                    "b": "QSB$",
                    "c": "RL4#Ucg"
                },
                {
                    "a": "ir%W25",
                    "b": "8SzJ!",
                    "c": "4Qeg"
                },
                {
                    "a": "4ExOBX",
                    "b": "6jH@Z",
                    "c": "eU[9"
                },
                {
                    "a": "h@n^Y",
                    "b": "zwIggI",
                    "c": "g*v8v^"
                },
                {
                    "a": "gRuM",
                    "b": "tTr",
                    "c": "jT)xSk"
                }
            ]
        ],
        [
            [
                {
                    "a": "lTs%",
                    "b": "#96s",
                    "c": "Vx1Emp"
                },
                {
                    "a": "q@2X",
                    "b": "n%fLEB",
                    "c": "rQCB"
                },
                {
                    "a": "d)9zq@",
                    "b": "G!6#",
                    "c": "4tF6ii"
                },
                {
                    "a": "qKE#O",
                    "b": "OWTQT",
                    "c": "PT([93h"
                },
                {
                    "a": "mL4[",
                    "b": "ZkGI",
                    "c": "gUiZ"
                }
            ],
            [
                {
                    "a": "#&[",
                    "b": "(dB7",
                    "c": "&IMe"
                },
                {
                    "a": "zcm@wrK",
                    "b": "lzmB$A",
                    "c": "D7N4"
                },
                {
                    "a": "%Vf",
                    "b": "Yg)@",
                    "c": "BD[vMD"
                },
                {
                    "a": "eKOT*",
                    "b": "Jd08V",
                    "c": "kg521ZB"
                },
                {
                    "a": "yB6P^H",
                    "b": "bYdJ6L",
                    "c": "fXx%w9]"
                },
                {
                    "a": "9TI[j",
                    "b": "8pW",
                    "c": "^Js"
                },
                {
                    "a": "jH[Km",
                    "b": "J$[Sx",
                    "c": "HdQd%n"
                }
            ],
            [
                {
                    "a": "0gnfie5",
                    "b": "FsDX@u",
                    "c": "m5o"
                },
                {
                    "a": "usnR[[N",
                    "b": "!r)$PE",
                    "c": "UiAR2@"
                },
                {
                    "a": "7jUzM",
                    "b": "OL!cx",
                    "c": "s)Odl"
                },
                {
                    "a": "mSSi",
                    "b": "(hjz[F",
                    "c": "WV)1"
                },
                {
                    "a": "S72O[",
                    "b": "#wC%5",
                    "c": "#wbA5E("
                }
            ]
        ],
        [
            [
                {
                    "a": "OhLw2@X",
                    "b": "0V0s",
                    "c": "!bfS7*N"
                },
                {
                    "a": "ROxxAl1",
                    "b": "C%S",
                    "c": "Erk"
                }
            ],
            [
                {
                    "a": "IO5[S",
                    "b": "H%5oC",
                    "c": "O45Y"
                },
                {
                    "a": "(]zn",
                    "b": "i6v&ytG",
                    "c": "c@hy"
                }
            ],
            [
                {
                    "a": "WWe!Vo3",
                    "b": "*5*6%WY",
                    "c": "%VuEKTn"
                },
                {
                    "a": "B06f%",
                    "b": "1AQvgQ",
                    "c": "BVzZk1"
                },
                {
                    "a": "Ama)",
                    "b": "Ur)m",
                    "c": "g*PP"
                },
                {
                    "a": "]KYp",
                    "b": "1so",
                    "c": "42%A"
                },
                {
                    "a": "s#G",
                    "b": "Z8%HY$",
                    "c": "r^sF2"
                },
                {
                    "a": "[AH&",
                    "b": "sK&P",
                    "c": "&bvKf"
                },
                {
                    "a": "x8j",
                    "b": "JeZTB$",
                    "c": "D5H0"
                }
            ],
            [
                {
                    "a": "UDIVbN",
                    "b": "QT]o#",
                    "c": "&GgRKxM"
                },
                {
                    "a": "obe7b",
                    "b": "T)Nx5",
                    "c": "^EM%[DT"
                },
                {
                    "a": "1[j[",
                    "b": "Tsmg4",
                    "c": "wYn"
                },
                {
                    "a": "M]ej",
                    "b": "7UMlY(y",
                    "c": "nmZai"
                },
                {
                    "a": "INGd",
                    "b": "1#d8bj",
                    "c": "1rZ"
                },
                {
                    "a": "9O3xTB",
                    "b": "@p(Z",
                    "c": "C8iM"
                },
                {
                    "a": "o9#hL^i",
                    "b": "YVyxyA",
                    "c": "NQg"
                },
                {
                    "a": "eFUq",
                    "b": "4xGM",
                    "c": "#dx$*b"
                }
            ],
            [
                {
                    "a": "5BEP^$N",
                    "b": "Zfyh",
                    "c": "roXC$Vx"
                },
                {
                    "a": "oSlF",
                    "b": "o1F!6",
                    "c": "E4bLjG"
                },
                {
                    "a": "qWN",
                    "b": "[dycQ",
                    "c": "l&yd"
                },
                {
                    "a": "EsZ7eTZ",
                    "b": "&Z#Wq",
                    "c": "cz%x$("
                },
                {
                    "a": "88!Jz",
                    "b": "URsc&",
                    "c": "FRSpRT"
                },
                {
                    "a": "EZvbe",
                    "b": "mksR",
                    "c": "M3KU"
                }
            ],
            [
                {
                    "a": "YRo9",
                    "b": "5X3pWW",
                    "c": "qnFRyKy"
                }
            ],
            [
                {
                    "a": "ugdc21c",
                    "b": "uPxX",
                    "c": "FE)m^J"
                },
                {
                    "a": "n))R",
                    "b": "@V%kFu",
                    "c": "Xny1)AC"
                },
                {
                    "a": "h^D",
                    "b": "ZEHe",
                    "c": "ns#C*E"
                }
            ],
            [
                {
                    "a": "^16s#",
                    "b": "8M#SO)h",
                    "c": "M)d%"
                },
                {
                    "a": "F(^n",
                    "b": "NWCyTn",
                    "c": "Pk%(7!"
                },
                {
                    "a": "01vT[U",
                    "b": "zCom!E8",
                    "c": "JGmgZw"
                },
                {
                    "a": "3kslH!",
                    "b": "USyi",
                    "c": "q6xc"
                },
                {
                    "a": "4eY*w",
                    "b": "n3do",
                    "c": "fhPxK"
                },
                {
                    "a": "Qmy61O",
                    "b": "JQjN$",
                    "c": "Tdqom"
                }
            ],
            [
                {
                    "a": "wwhY",
                    "b": "RwKR",
                    "c": "*qO9O"
                },
                {
                    "a": "@8FS",
                    "b": "4Wawz",
                    "c": "jQI]]"
                },
                {
                    "a": "s0KV",
                    "b": "BRLml",
                    "c": "zyTr&Bm"
                },
                {
                    "a": "OFub5",
                    "b": "uQB70",
                    "c": "[PS^r"
                },
                {
                    "a": "jBmoc",
                    "b": "pDiGv",
                    "c": "l(42t"
                },
                {
                    "a": "p%SyIlU",
                    "b": "zlX#",
                    "c": "Y2Y)v4"
                },
                {
                    "a": "LZbD3ah",
                    "b": "PhU",
                    "c": "ujX#"
                },
                {
                    "a": "hu*$v",
                    "b": "XiD",
                    "c": "WT)MO"
                },
                {
                    "a": "eCwj",
                    "b": "*IkN",
                    "c": "801o6]"
                },
                {
                    "a": "o56k",
                    "b": "rO8K",
                    "c": "EKbiz"
                }
            ]
        ],
        [
            [
                {
                    "a": "!f#M4E",
                    "b": "gQL$",
                    "c": "GpVA(X"
                },
                {
                    "a": "^3P3",
                    "b": "mXncDZt",
                    "c": "^[B%"
                },
                {
                    "a": ")8iJKd",
                    "b": "c&Q6j",
                    "c": "hmAH"
                },
                {
                    "a": ")D@^9",
                    "b": "oOVe%p",
                    "c": "m[D#d"
                },
                {
                    "a": "8t6Sc3",
                    "b": "1Sf$4",
                    "c": "jFp7@"
                }
            ],
            [
                {
                    "a": "HGx",
                    "b": "Cxu)V",
                    "c": "DVRb3"
                },
                {
                    "a": "&H(T)",
                    "b": "WqF",
                    "c": "qzrFwP"
                },
                {
                    "a": "hOw",
                    "b": "WW(vA",
                    "c": "^X#zT"
                },
                {
                    "a": "vxN",
                    "b": "QSk&nu",
                    "c": "ptH3^o"
                },
                {
                    "a": "VbbadJ",
                    "b": "jcXxHR",
                    "c": "X#%uv"
                },
                {
                    "a": "XL*",
                    "b": "(hlx5VB",
                    "c": "Hfjd"
                },
                {
                    "a": "@xe]L",
                    "b": "uRNlwyN",
                    "c": "(O2qxvH"
                },
                {
                    "a": "ETtr[D",
                    "b": "&SWT",
                    "c": "xcBdee"
                },
                {
                    "a": "aoh",
                    "b": "O4w",
                    "c": "o#B4"
                }
            ]
        ],
        [
            [
                {
                    "a": "U^(",
                    "b": "BjFR0L",
                    "c": "Iq*3"
                },
                {
                    "a": "7[Yj3e",
                    "b": "Wuy)",
                    "c": "W@!^"
                },
                {
                    "a": "SNFpI",
                    "b": "6v9mx7",
                    "c": "[tQTP"
                },
                {
                    "a": "kywJD",
                    "b": "D&1$nQ",
                    "c": "whZQ"
                },
                {
                    "a": "B)&i]",
                    "b": "3JAi",
                    "c": "iZEGk8J"
                },
                {
                    "a": "$yrY*",
                    "b": "q7kE6N!",
                    "c": "IU4LJA"
                },
                {
                    "a": ")YE)N",
                    "b": "LVg%e",
                    "c": "VKgD"
                }
            ],
            [
                {
                    "a": "qDL&z",
                    "b": "dCXK",
                    "c": "MMvNOM"
                },
                {
                    "a": "e5XXie",
                    "b": "Kp&SBt",
                    "c": "n@Lnh"
                },
                {
                    "a": "d$r",
                    "b": "O@N2[W",
                    "c": "eNP6"
                },
                {
                    "a": "#KJ4d",
                    "b": "1I1k@uK",
                    "c": "$w[b"
                },
                {
                    "a": "#MNX1",
                    "b": "Y&y",
                    "c": "MFEm"
                },
                {
                    "a": "rND",
                    "b": "tGT(m",
                    "c": "ZIy3$"
                },
                {
                    "a": "r3gC",
                    "b": "qmJt",
                    "c": "E!Tt%"
                },
                {
                    "a": "VaogQ#g",
                    "b": "OWSA0",
                    "c": "1T7gq"
                },
                {
                    "a": "mZn",
                    "b": "w1VMF",
                    "c": "Hl)ulu"
                }
            ],
            [
                {
                    "a": "FW%*",
                    "b": "jph(W",
                    "c": "E!B("
                },
                {
                    "a": "^rq3ND",
                    "b": "PK**",
                    "c": "a2ZJ"
                },
                {
                    "a": "W]2p63W",
                    "b": "9byWjkk",
                    "c": "fSkjY)H"
                },
                {
                    "a": "5dmA]K",
                    "b": "k4ahS",
                    "c": "p!t^"
                }
            ],
            [
                {
                    "a": "[b%wZYw",
                    "b": "w[l",
                    "c": "f4nVEH"
                },
                {
                    "a": "fuo$",
                    "b": "UIKQQ6",
                    "c": "V2iPyoG"
                },
                {
                    "a": "J(x7",
                    "b": "mJ09^E",
                    "c": "^uKx^["
                },
                {
                    "a": "1PEA",
                    "b": "A4uS",
                    "c": "RJ$"
                },
                {
                    "a": "r9neV",
                    "b": "qz*",
                    "c": "AX)3r9neV"
                },
                {
                    "a": "[s0Luf",
                    "b": "FXI^p6",
                    "c": "HdG1"
                },
                {
                    "a": "m@1%[V",
                    "b": "cGqri",
                    "c": "uP6"
                },
                {
                    "a": "UIU9W2",
                    "b": "KEMl",
                    "c": "rN)oY@"
                },
                {
                    "a": "%))t",
                    "b": "blL&z",
                    "c": "7cvGjq@"
                }
            ]
        ],
        [
            [
                {
                    "a": "#m)l",
                    "b": "GcqvV",
                    "c": "8Z&"
                },
                {
                    "a": "oG4)",
                    "b": "l7Sl",
                    "c": "sD#F"
                },
                {
                    "a": "AY9Nc",
                    "b": "s0v@4v",
                    "c": "qQD"
                },
                {
                    "a": "IoaVX2",
                    "b": "GjVAE",
                    "c": "lcly"
                }
            ],
            [
                {
                    "a": "aKeg&gr",
                    "b": "A#IkB(",
                    "c": "sWu^kC"
                },
                {
                    "a": "T4uhFU",
                    "b": "fWof",
                    "c": "*#DOwq"
                },
                {
                    "a": "Ld@bC",
                    "b": "^P)Jye",
                    "c": "ig27E"
                },
                {
                    "a": "(jQEd",
                    "b": "n3e2W",
                    "c": "KXA8&W"
                }
            ],
            [
                {
                    "a": "0qfJ@B",
                    "b": "$*J%Pr6",
                    "c": "tDAcH"
                },
                {
                    "a": "BkAiN^",
                    "b": "YZ41",
                    "c": "KOf5h*o"
                }
            ],
            [
                {
                    "a": "BSu&pZN",
                    "b": "1jv90*",
                    "c": "V*0ht"
                },
                {
                    "a": "nGf9j",
                    "b": "xA5zS",
                    "c": "@i(PZ"
                }
            ],
            [
                {
                    "a": "t@4(DA",
                    "b": "JQz",
                    "c": "@PeZPq"
                },
                {
                    "a": "CvGps",
                    "b": "B!z",
                    "c": "*[!6"
                },
                {
                    "a": "l%Gp^U",
                    "b": "sR[W",
                    "c": "ODRfQ"
                },
                {
                    "a": "QgI2j",
                    "b": "$gsw",
                    "c": "H(7QSR"
                },
                {
                    "a": "XJ&qj",
                    "b": "OV!",
                    "c": "Mfp"
                }
            ],
            [
                {
                    "a": "w[NS2k",
                    "b": "0[YE0N",
                    "c": "Tah4F"
                },
                {
                    "a": "B*N2x",
                    "b": "Lb$2N(",
                    "c": "BK%UX(0"
                },
                {
                    "a": "#*rRi2",
                    "b": "QW^h",
                    "c": "F3JR8O"
                },
                {
                    "a": "Z%&s",
                    "b": "2Yj9",
                    "c": "ygpsc"
                },
                {
                    "a": "8^3B[",
                    "b": "zz[LY",
                    "c": "QJvr(bj"
                }
            ]
        ]
    ]
}
</code></pre>
</details>