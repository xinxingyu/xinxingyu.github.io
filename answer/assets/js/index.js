window.onerror = function(msg, url, line, col, error) {
    alert(msg)
    console.log(msg)
}
// window.onload = function(){ 
//     alert(1); 
// } 
$(function () {
    var mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
    var touchstart = mobile ? "touchstart" : "mousedown";
    var touchend = mobile ? "touchend" : "mouseup";
    var touchmove = mobile ? "touchmove" : "mousemove";

    var a = document.querySelector("#bgAudio")

    if (isWeiXin() && isApp() == 0) {
        if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
            WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
                // main();
            }, false);
        } else {
            document.addEventListener("WeixinJSBridgeReady", function () {
                WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
                    main()
                });
            }, false);
        }
    } else {
        alert('not ios app!')
        main();
    }
    
    function isWeiXin() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    }
    function isApp() {
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
            return 0;
        } else if (/(Android)/i.test(navigator.userAgent)) {
            return 1;
        } else {
            return 2;
        };
    }

    // Listen for orientation changes
    window.addEventListener("orientationchange", function () {
        // Announce the new orientation number
        if (window.orientation == 0) {
            alert('竖屏观看模式！')
        } else {
        }
    }, false);

    function main() {
        function initQuestionsAndResults() {
            var arr1 = getArrayItems(Questions.knowledge, 2)
            var arr2 = getArrayItems(Questions.interest, 2)
            var arr3 = getArrayItems(Questions.dialect, 1)
            var narr = [];
            var questions = narr.concat(arr1, arr2, arr3)
            var results = [];

            for (var index = 0; index < questions.length; index++) {
                var item = questions[index];
                item.isChoiced = false;
                item.isQuestionAudio = false;
                item.isAnswerAudio = false;
                for (var j = 0; j < item.answer.length; j++) {
                    item.answer[j].choiced = 0;
                }
                results.push({
                    item: questions[index],
                    right: false,
                    isChoiced: false
                })
            }
            return {
                questions: questions,
                results: results
            }
        }

        function getArrayItems(arr, num) {
            var temp_array = [];
            for (var index in arr) {
                temp_array.push(arr[index]);
            }
            var return_array = [];
            for (var i = 0; i < num; i++) {
                if (temp_array.length > 0) {
                    var arrIndex = Math.floor(Math.random() * temp_array.length);
                    return_array[i] = temp_array[arrIndex];
                    temp_array.splice(arrIndex, 1);
                } else {
                    break;
                }
            }
            return return_array;
        }
        var InitQuestionsAndResults = initQuestionsAndResults();
   
        var vue = new Vue({
            el: '#wrapper',
            data: {
                loadingPath: '../assets/img/',
                mediaPath: '../assets/media/',
                motionObj: [],
                showTips: false,
                bgAudio: null,
                bellAudio: null,
                startAudio: null,
                rulesAudio: null,
                questionAudio: null,
                answerAudio: null,
                questionBgAudio: null,
                result1Audio: null,
                result2Audio: null,
                result3Audio: null,
                loadingTimer: null,
                mySwiper: null,
                // answer: false,
                questions: InitQuestionsAndResults.questions,
                results: InitQuestionsAndResults.results,
                scoreInfo: {
                    value: 0,
                    index: 1
                },
                firstTime: true
            },
            created() {
                // this.initAnswer()
            },
            mounted() {
                this.init()
            },
            methods: {
                init() {
                    //阻止屏幕滑动
                    $('html, body').on(touchmove, function (e) {
                        e.preventDefault()
                    })
                    this.bgAudio = $('#bgAudio')[0];
                    this.startAudio = $('#startAudio')[0];
                    this.bellAudio = $('#bell')[0];
                    // this.dropAudio = $('#dropAudio')[0];
                    this.rulesAudio = $('#rulesAudio')[0];
                    this.questionBgAudio = $('#questionBgAudio')[0];
                    this.questionAudio = $('#questionAudio')[0];
                    this.answerAudio = $('#answerAudio')[0];
                    this.result1Audio = $('#result1')[0];
                    this.result2Audio = $('#result2')[0];
                    this.result3Audio = $('#result3')[0];

                    this.bgAudio.load();
                    this.startAudio.load();
                    this.bellAudio.load();
                    this.rulesAudio.load();
                    this.questionBgAudio.load();
                    this.result1Audio.load();
                    this.result2Audio.load();
                    this.result3Audio.load();

                    this.initLoading();
                    this.initAnimation();
                },
                initLoading() {
                    var that = this;
                    var loader = new createjs.LoadQueue(false);
                    // var loader = new createjs.LoadQueue(true);
                    var manifest = [
                        {src: this.loadingPath + 'move1.png'},
                        {src: this.loadingPath + 'move2.png'},
                        {src: this.loadingPath + 'move3.png'},
                        {src: this.loadingPath + 'move4.png'},
                        {src: this.loadingPath + 'musicicon.png'},
                        {src: this.loadingPath + 'musicicon_close.png'},
                        {src: this.loadingPath + 'bg11.jpg'},
                        {src: this.loadingPath + 'bg2.jpg'},
                        {src: this.loadingPath + 'bg3.jpg'},
                        {src: this.loadingPath + 'p2_1.png'},
                        {src: this.loadingPath + 'p2_2.png'},
                        {src: this.loadingPath + 'p2_bg.png'},
                        {src: this.loadingPath + 'p2_girl.png'},
                        {src: this.loadingPath + 'p2_rules_tip.png'},
                        {src: this.loadingPath + 'p2_rules_text2.gif'},
                        // {src: this.loadingPath + 'p2_rules_pen.gif'},
                        // {src: this.loadingPath + 'p2_rules_textbox.png'},
                        {src: this.loadingPath + 'wave.gif'},
                        {src: this.loadingPath + 'wave.png'},
                        {src: this.loadingPath + 'face.gif'},
                        {src: this.loadingPath + 'icon_error.png'},
                        {src: this.loadingPath + 'icon_right.png'},
                        {src: this.loadingPath + 'p4_frame.jpg'},
                        {src: this.loadingPath + 'voicebg1.png'},
                        {src: this.loadingPath + 'voicebg2.png'},
                        {src: this.loadingPath + 'rules.png'},
                        {src: this.loadingPath + 'question_dialect_1.png'},
                        {src: this.loadingPath + 'question_dialect_2.png'},
                        {src: this.loadingPath + 'question_dialect_3.png'},
                        {src: this.loadingPath + 'question_dialect_4.png'},
                        {src: this.loadingPath + 'question_interest_1.png'},
                        {src: this.loadingPath + 'question_interest_2.png'},
                        {src: this.loadingPath + 'question_interest_3.png'},
                        {src: this.loadingPath + 'question_interest_4.png'},
                        {src: this.loadingPath + 'question_interest_5.png'},
                        {src: this.loadingPath + 'question_knowledge_1.png'},
                        {src: this.loadingPath + 'question_knowledge_2.png'},
                        {src: this.loadingPath + 'question_knowledge_3.png'},
                        {src: this.loadingPath + 'question_knowledge_4.png'},
                        {src: this.loadingPath + 'question_knowledge_5.png'},
                        {src: this.loadingPath + 'question_knowledge_6.png'},
                        {src: this.loadingPath + 'question_knowledge_7.png'},
                        {src: this.loadingPath + 'question_type_dialect.png'},
                        {src: this.loadingPath + 'question_type_interest.png'},
                        {src: this.loadingPath + 'question_type_knowledge.png'},
                        {src: this.loadingPath + 'text0.png'},
                        {src: this.loadingPath + 'text1.png'},
                        {src: this.loadingPath + 'text2.png'},
                        {src: this.loadingPath + 'text3.png'},
                        {src: this.loadingPath + 'text4.png'},
                        {src: this.loadingPath + 'text5.png'},
                        {src: this.loadingPath + 'p4_ribbon.png'},
                        {src: this.loadingPath + 'p4_ribbon2.png'},
                        {src: this.loadingPath + 'open.gif'}
                    ];

                    that.bgAudio.play()

                    //start loading sequence frame
                    // loadingAnimation();
                    
                    loader.addEventListener("progress", handleOverallProgress);
                    loader.addEventListener("complete", handleOverallComplete);
                    loader.setMaxConnections(1);
                    loader.loadManifest(manifest);

                    function loadingAnimation() {
                        var loadDom = $('.loadingicon');
                        var index = 2
                        that.loadingTimer = setInterval(function (e) {
                            if (index > 4) index = 1;
                            loadDom.css({
                                // 'background-image': 'url("' + that.loadingPath + 'loading' + index + '.png")'
                                'background-image': 'url("' + that.loadingPath + 'move' + index + '.png")'
                            })
                            index++;
                        }, 150)
                    }

                    function handleOverallProgress(event) {
                        var process = Math.ceil(event.loaded * 100) + '%'
                        $('.inner').css('width', process);
                        $('.loading').find('.num').html(process);
                    }

                    function handleOverallComplete(event) {
                        // clearInterval(that.loadingTimer);

                        $('.loading').remove();
                        $('.main').fadeIn(function () {
                            $('.musicicon').fadeIn();
                            that.girlMove();
                            that.motionObj['page1'].restart();
                        });
                    }
                },
                initAnimation() {
                    var that = this;
                    that.motionObj["page1"] = new TimelineMax();
                    that.motionObj["page2"] = new TimelineMax();
                    that.motionObj["page4"] = new TimelineMax();

                    that.motionObj['page' + 1].add(TweenMax.to('.page1 .bg', 6, {
                        // "transform": "translateX(-700px)",
                        "transform": "translateX(-900px)",
                        ease: Linear.easeNone,
                        onComplete: function () {
                            clearInterval(that.loadingTimer);
                            setTimeout(function() {
                                that.page2Animation();
                            }, 1000)
                        }
                    }));
                    that.motionObj['page' + 1].pause();
                    that.motionObj['page' + 2].add(
                        // TweenMax.from('.rules_tip, .rules_pen, .rules_textbox, .rules_text, .receive', 1, {
                        TweenMax.from('.rules_tip, .rules_text, .receive', 1, {
                            delay: 1.4,
                            alpha: 0,
                            y: -100,
                            ease: Linear.easeOut
                        }
                    ));
                    that.motionObj['page' + 2].add(TweenMax.fromTo('.receive', 0.5, {
                        yoyo: true,
                        repeat: -1,
                        scale: 0.8,
                        ease: Linear.easeNone
                    }, {
                        yoyo: true,
                        repeat: -1,
                        scale: 1,
                        ease: Linear.easeNonet
                    }));
                    that.motionObj['page' + 2].pause();
                    that.motionObj['page' + 4].add(TweenMax.from('.page4 .tip', 0.5, {
                        alpha: 0,
                        y: -100,
                        ease: Linear.easeOut
                    }));
                    that.motionObj['page' + 4].add(TweenMax.from('.page4 .frame', 0.5, {
                        alpha: 0,
                        scale: 0.5,
                        ease: Linear.easeOut
                    }));
                    that.motionObj['page' + 4].add(TweenMax.from('.page4 .icon', 1, {
                        alpha: 0,
                        scale: 0.5,
                        ease: Elastic.easeOut
                    }));
                    that.motionObj['page' + 4].add(TweenMax.from('.page4 .ribbon', 0.5, {
                        delay: -0.8,
                        alpha: 0,
                        y: -50,
                        ease: Linear.easeNone
                    }));
                    that.motionObj['page' + 4].add(TweenMax.to('.page4 .ribbon', 1, {
                        yoyo: true,
                        repeat: -1,
                        y: 10,
                        ease: Linear.easeNone
                    }));
                    that.motionObj['page' + 4].pause();

                    //animation of question's page
                    for (var i = 1; i <= 5; i++) {
                        that.motionObj["qst" + i] = new TimelineMax();
                        that.motionObj['qst' + i].add(
                            TweenMax.from('.qst' + i + ' .index', 0.5, {
                                alpha: 0,
                                scale: 0.7,
                                ease: Linear.easeOut
                            }));
                        that.motionObj['qst' + i].add(
                            TweenMax.from('.qst' + i + ' .info, .qst' + i + ' .question', 0.5, {
                                delay: -0.2,
                                alpha: 0,
                                x: -100,
                                ease: Linear.easeOut
                            }));
                        that.motionObj['qst' + i].add(
                            TweenMax.from('.qst' + i + ' .answer', 0.5, {
                                alpha: 0,
                                x: -100,
                                ease: Linear.easeOut
                            }));
                        that.motionObj['qst' + i].pause();
                    }
                },
                initSwiper() {
                    this.mySwiper = new Swiper('.swiper-container', {
                        autoplay: false,
                        allowTouchMove: false
                    })
                },
                initQuestionAudio(name, src) {
                    this[name].src = this.mediaPath + src;
                },
                page2Animation() {
                    var that = this;
                    
                    TweenMax.to('.bg', 1.5, {
                        scale: 4.94,
                        x: -2016,
                        y: -561,
                        onComplete: function () {
                            // $('.open').fadeIn();
                            // that.bellAudio.play();
                            setTimeout(function() {
                                that.bgAudio.pause();
                                // that.bgAudio.volume = 0.3;
                                $('.musicicon').fadeOut();
                                that.startPage2()
                            }, 2000)
                        }
                    });
                    //the girl is fade out
                    TweenMax.to('.girl', 1.5, {
                        scale: 2,
                        opacity: 0,
                        // x: -210,
                        x: -120,
                        y: -72,
                        onStart: function() {
                            that.bgAudio.pause();
                            that.bellAudio.play();
                        },
                        onComplete: function () {
                            // $('.girl').fadeOut(200)
                            $('.open').fadeIn();
                            
                        }
                    })
                },
                girlMove() {
                    var that = this;
                    var index = 2;
                    var loadDom = $('.girl');
                    move();
                    that.loadingTimer = setInterval(move, 150)

                    function move() {
                        if (index > 4) index = 1;
                        loadDom.css({
                            'background-image': 'url("' + that.loadingPath + 'move' + index + '.png")'
                        })
                        index++;
                    }
                },
                startPage2() {
                    var that = this;

                    $('.page1').fadeOut(800, function() {
                        if (!that.startAudio.src) {
                            that.startAudio.src = that.mediaPath+"start.mp3"
                        }
                        that.startAudio.play();
                    });

                    // that.startAudio.play();
                    //你敢挑战吗，动画
                    setTimeout(function () {
                        $('.main').find('.p2_1').fadeOut();
                        $('.main').find('.face').fadeOut();
                        $('.main').find('.talk').fadeOut();
                        $('.main').find('.p2_2').show();
                     
                        //规则动画出来
                        setTimeout(function () {
                            setTimeout(function () {
                                $('.main').find('.face, .p2_bg, .p2_girl').fadeIn();
                                $('.main').find('.p2_2').fadeOut();
                            }, 800)
                            that.motionObj['page2'].restart();
                            setTimeout(function() {
                                that.rulesAudio.play();
                            }, 1000)
                        }, 1000)
                    }, 15000)

                    // that.startAudio.onended = function () {
                    //     //ended of play start audio
                    //     setTimeout(function () {
                    //         $('.main').find('.p2_2').fadeOut();
                    //         $('.main').find('.talk').fadeOut();
                    //         $('.main').find('.face').fadeOut();
                    //     }, 800)
                    //     that.motionObj['page2'].restart();
                    //     that.dropAudio.play();
                    // };
                },
                startAnswer() {
                    var qsType = this.questions[0].type;
                    var qsInfo = this.questions[0].info;

                    $('.page2').fadeOut();
                    this.questionBgAudio.play()
                    this.initSwiper();
                    this.motionObj['qst' + 1].restart();
                    this.initQuestionAudio('questionAudio', qsType + qsInfo + '_qst.mp3')
                    this.initQuestionAudio('answerAudio', qsType + qsInfo + '_as.mp3')
                    // this.initQuestionAudio('questionAudio', qsType + qsInfo + '.mp3')
                    this.playAudio(0)
                },
                choice(item, index, obj, objIndex) {
                    var that = this;

                    if (obj.isChoiced) return;
                    this.questions[objIndex].isChoiced = true;

                    //set the result to data
                    this.results[objIndex].isChoiced = true;
                    this.results[objIndex].right = true;

                    //choiced: 1（选中）2（选错的正确答案）
                    this.questions[objIndex].answer[index].choiced = 1;

                    //the choice is not right answer
                    if (!this.questions[objIndex].answer[index].right) {
                        this.results[objIndex].right = false;
                        var answerList = this.questions[objIndex].answer;
                        // for (var i = 0; i < answerList.length; i++) {
                        //     if (answerList[i].right) {
                        //         that.questions[objIndex].answer[i].choiced = 2;
                        //     }
                        // }
                    }

                    if (!this.questions[objIndex].onlyQuestionAudio) {
                        $('.qst' + (objIndex + 1)).find('.rightAnswer').fadeIn();
                    }

                    // //trigger when current question is five
                    // //show the result page and start animation of 'page4' 
                    // if (objIndex == 4) {
                    //     this.handleResults();
                    //     this.questionBgAudio.pause()
                    //     setTimeout(function () {
                    //         $('.page3').fadeOut();
                    //         that['result'+that.scoreInfo.index+'Audio'].play()
                    //         that.motionObj['page4'].restart();
                    //     }, 900)
                    // }
                },
                /**
                 * switch to next question page
                 */
                nextQuestion(index) {
                    var that = this;

                    //trigger when current question is five
                    //show the result page and start animation of 'page4' 
                    if (index == 4) {
                        this.handleResults();
                        this.questionBgAudio.pause()
                        $('.page3').fadeOut();
                        that['result'+that.scoreInfo.index+'Audio'].play()
                        that.motionObj['page4'].restart();
                    } else {
                        //'index' is last question's index
                        //current is inde + 1
                        var qsType = this.questions[index + 1].type;
                        var qsInfo = this.questions[index + 1].info;

                        //current question status: answered or unanswered
                        if (!this.results[index].isChoiced) {
                            // alert('请选择答案后，再进入下一题~');
                            this.showTips = true;
                            return;
                        }

                        this.mySwiper.slideTo(index + 1);

                        this.motionObj['qst' + (index + 2)].restart()

                        //if only hvae question audio
                        if (this.questions[index + 1].onlyQuestionAudio) {
                            this.initQuestionAudio('questionAudio', qsType + qsInfo + '_qst.mp3')
                        } else {
                            this.initQuestionAudio('questionAudio', qsType + qsInfo + '_qst.mp3')
                            this.initQuestionAudio('answerAudio', qsType + qsInfo + '_as.mp3')
                        }

                        // if (this.firstTime) {
                            this.playAudio(index+1)
                        // }
                    }
                },
                /**
                 * 
                 * play audio of every question's page
                 * @param {Number} index [the index of page number]
                 * 
                 */
                playAudio(index) {
                    var that = this;
                    this.questionAudio.play();
                    this.questions[index].isQuestionAudio = true;
                    this.questionAudio.onended = function () {
                        that.questions[index].isQuestionAudio = false;
                    };
                },
                playAnswerAudio(index) {
                    var that = this;
                    this.answerAudio.play()
                    this.questions[index].isAnswerAudio = true;
                    this.answerAudio.onended = function () {
                        that.questions[index].isAnswerAudio = false;
                    };
                },
                operateMusic: function () {
                    if (!this.bgAudio.paused) {
                        $('.musicicon').css({
                            'background': 'url("' + this.loadingPath + 'musicicon_close.png")'
                        })
                        this.bgAudio.pause()
                    } else {
                        $('.musicicon').css({
                            'background': 'url("' + this.loadingPath + 'musicicon.png")'
                        })
                        this.bgAudio.play()
                    }
                },
                handleResults() {
                    var r = {0: 1, 1: 1, 2: 1, 3: 2, 4: 2, 5: 3};
                    for (var i = 0; i < this.results.length; i++) {
                        if (this.results[i].right) this.scoreInfo.value++;
                    }
                    this.scoreInfo.index = r[this.scoreInfo.value];
                },
                replayGame() {
                    var nqr = initQuestionsAndResults()
                    
                    this.firstTime = false;
                    this.questions = nqr.questions;
                    this.results = nqr.results;
                    this.scoreInfo = {
                        value: 0,
                        index: 1
                    }
                    //hide right answer
                    for(var i=1; i<=5; i++) {
                        $('.qst' + i).find('.rightAnswer').hide();
                    }
                    
                    $('.page3').fadeIn();
                    this.initSwiper();

                    var qsType = this.questions[0].type;
                    var qsInfo = this.questions[0].info;
                    this.motionObj['qst' + 1].restart();

                    this.initQuestionAudio('questionAudio', qsType + qsInfo + '_qst.mp3')
                    this.initQuestionAudio('answerAudio', qsType + qsInfo + '_as.mp3')
                    // this.initQuestionAudio('questionAudio', qsType + qsInfo + '.mp3');

                    //replay background audio of question pages
                    this.questionBgAudio.currentTime = 0;
                    this.questionBgAudio.play()
                    this.playAudio(0)
                },
                share() {
                    $('.sharemask').fadeIn();
                },
                hideShare() {
                    $('.sharemask').fadeOut();
                },
                closeTips(e) {
                    e.stopPropagation()
                    e.preventDefault()
                    this.showTips = false;
                }
            }
        })
    }
})