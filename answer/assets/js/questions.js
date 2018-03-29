var Questions = {
    dialect: [{
            type: 'dialect',
            question: '歌谣里“满怀揣”是什么意思？',
            persion: '甘肃省 张家豪 6岁',
            info: 1,
            onlyQuestionAudio: true,
            voiceTime: 8,
            answer: [{
                key: 'A',
                value: '使劲踹',
                right: false
            }, {
                key: 'B',
                value: '放进兜里',
                right: true
            }]
        },
        {
            type: 'dialect',
            info: 2,
            question: '歌谣里“梅花朵”是什么意思？',
            persion: '湖南省 向晨橙 5岁',
            onlyQuestionAudio: true,
            voiceTime: 11,
            answer: [{
                key: 'A',
                value: '梅花',
                right: false
            }, {
                key: 'B',
                value: '雪花',
                right: true
            }]
        },
        {
            type: 'dialect',
            info: 3,
            question: '歌谣里“打罗罗”是什么意思？',
            persion: '青海省 沈央金卓玛 5岁',
            onlyQuestionAudio: true,
            voiceTime: 20,
            answer: [{
                key: 'A',
                value: '打锣的意思',
                right: false
            }, {
                key: 'B',
                value: '高兴的拍手',
                right: true
            }]
        },
        {
            type: 'dialect',
            info: 4,
            question: '歌谣里“罩里”是什么意思？',
            persion: '山西省 刘禹敬 4岁',
            onlyQuestionAudio: true,
            voiceTime: 5,
            answer: [{
                key: 'A',
                value: '钥匙',
                right: false
            }, {
                key: 'B',
                value: '漏勺',
                right: true
            }]
        },
    ],
    knowledge: [{
            type: 'knowledge',
            info: 1,
            question: '为什么世界上要有树？',
            persion: '甘肃省 夏子怡 7岁',
            onlyQuestionAudio: false,
            voiceTime: 2,
            answer: [{
                key: 'A',
                value: '因为树可以释放氧气',
                right: true
            }, {
                key: 'B',
                value: '因为树可以盖房子',
                right: false
            }]
        },
        {
            type: 'knowledge',
            info: 2,
            question: '我们为什么要吃饭？',
            persion: '甘肃省 杨佳怡 5岁',
            onlyQuestionAudio: false,
            voiceTime: 2,
            answer: [{
                key: 'A',
                value: '需要补充能量',
                right: true
            }, {
                key: 'B',
                value: '因为条件反射',
                right: false
            }]
        },
        {
            type: 'knowledge',
            info: 3,
            question: '飞机怎么能在天上飞啊？',
            persion: '湖南省 石林旭 6岁',
            onlyQuestionAudio: false,
            voiceTime: 3,
            answer: [{
                key: 'A',
                value: '因为它有燃料',
                right: false
            }, {
                key: 'B',
                value: '因为它改变了气压',
                right: true
            }]
        },
        {
            type: 'knowledge',
            info: 4,
            question: '肚子饿了为什么会咕咕叫？',
            persion: '湖南省 胡岘森 4岁',
            onlyQuestionAudio: false,
            voiceTime: 3,
            answer: [{
                key: 'A',
                value: '胃里的气体和液体打架',
                right: true
            }, {
                key: 'B',
                value: '因为胃紧张了',
                right: false
            }]
        },
        {
            type: 'knowledge',
            info: 5,
            question: '云为什么不会掉下来？',
            persion: '山西省 陶芃宇 4岁',
            onlyQuestionAudio: false,
            voiceTime: 2,
            answer: [{
                key: 'A',
                value: '有热空气托着它们',
                right: true
            }, {
                key: 'B',
                value: '云本身就是空气的另一种<br>表现形态',
                right: false
            }]
        },
        {
            type: 'knowledge',
            info: 6,
            question: '天空为什么这么蓝啊？',
            persion: '湖南省 龙雪芳 4岁',
            onlyQuestionAudio: false,
            voiceTime: 2,
            answer: [{
                key: 'A',
                value: '光散射造成的',
                right: true
            }, {
                key: 'B',
                value: '其他颜色被空气吸收了',
                right: false
            }]
        },
        {
            type: 'knowledge',
            info: 7,
            question: '青蛙为什么要生活在水里？',
            persion: '青海省 沈央金卓玛 5岁',
            onlyQuestionAudio: false,
            voiceTime: 3,
            answer: [{
                key: 'A',
                value: '因为皮肤必须保持湿润',
                right: true
            }, {
                key: 'B',
                value: '因为青蛙和鱼一样要在<br>水里呼吸',
                right: false
            }]
        }
    ],
    interest: [{
            type: 'interest',
            info: 1,
            question: '为什么北极熊不能和企鹅不能在一起玩耍？',
            persion: '甘肃省 张艺轩 6岁',
            onlyQuestionAudio: false,
            voiceTime: 4,
            answer: [{
                key: 'A',
                value: '因为北极熊太大了',
                right: false
            }, {
                key: 'B',
                value: '因为北极熊会吃了企鹅',
                right: true
            }]
        },
        {
            type: 'interest',
            info: 2,
            question: '为什么要有学校？',
            persion: '甘肃省 张家豪 6岁',
            onlyQuestionAudio: false,
            voiceTime: 2,
            answer: [{
                key: 'A',
                value: '因为可以长知识',
                right: true
            }, {
                key: 'B',
                value: '学校里可以认识好朋友',
                right: false
            }]
        },
        {
            type: 'interest',
            info: 3,
            question: '为什么爸爸妈妈老看着我呢？',
            persion: '山西省 康丛菲 4岁',
            onlyQuestionAudio: false,
            voiceTime: 2,
            answer: [{
                key: 'A',
                value: '爸爸妈妈喜欢我',
                right: false
            }, {
                key: 'B',
                value: '因为是照片',
                right: true
            }]
        },
        {
            type: 'interest',
            info: 4,
            question: '为什么我一生下来不会写字呢？',
            persion: '山西省 康晋鹏 5岁',
            onlyQuestionAudio: false,
            voiceTime: 2,
            answer: [{
                key: 'A',
                value: '因为我还小',
                right: true
            }, {
                key: 'B',
                value: '因为我还没有练字',
                right: false
            }]
        },
        {
            type: 'interest',
            info: 5,
            question: '兔子为什么要吃萝卜？',
            persion: '山西省 刘慧 4岁',
            onlyQuestionAudio: false,
            voiceTime: 2,
            answer: [{
                key: 'A',
                value: '吃了萝卜眼睛亮',
                right: false
            }, {
                key: 'B',
                value: '因为不吃萝卜就会死掉',
                right: true
            }]
        },
    ],
}