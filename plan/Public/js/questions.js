var imgPath = '../Public/images/questions/';
var Questions = [
	{
		type: 1,
		question: '哪个明星没参演过《我不是潘金莲》',
		answer: [
			{
				key: 'A',
				value: imgPath + '01/1.jpg'
			},
			{
				key: 'B',
				value: imgPath + '01/2.jpg'
			},
			{
				key: 'C',
				value: imgPath + '01/3.jpg'
			},
			{
				key: 'D',
				value: imgPath + '01/4.jpg'
			}
		],
		isTrue: 'A'
	},
	{
		type: 1,
		question: '哪款不是佳能镜头',
		answer: [
			{
				key: 'A',
				value: imgPath + '02/1.jpg'
			},
			{
				key: 'B',
				value: imgPath + '02/2.jpg'
			},
			{
				key: 'C',
				value: imgPath + '02/3.jpg'
			},
			{
				key: 'D',
				value: imgPath + '02/4.jpg'
			}
		],
		isTrue: 'A'
	},
	{
		type: 1,
		question: '哪张图是50mm镜头拍摄的',
		answer: [
			{
				key: 'A',
				value: imgPath + '03/1.jpg'
			},
			{
				key: 'B',
				value: imgPath + '03/2.jpg'
			},
			{
				key: 'C',
				value: imgPath + '03/3.jpg'
			},
			{
				key: 'D',
				value: imgPath + '03/4.jpg'
			}
		],
		isTrue: 'D'
	},
	{
		type: 1,
		question: '哪张照片不是同一个人',
		answer: [
			{
				key: 'A',
				value: imgPath + '04/1.jpg'
			},
			{
				key: 'B',
				value: imgPath + '04/2.jpg'
			},
			{
				key: 'C',
				value: imgPath + '04/3.jpg'
			},
			{
				key: 'D',
				value: imgPath + '04/4.jpg'
			}
		],
		isTrue: 'A'
	},
	{
		type: 1,
		question: '哪张照片是没有经过滤镜处理的原图',
		answer: [
			{
				key: 'A',
				value: imgPath + '05/1.jpg'
			},
			{
				key: 'B',
				value: imgPath + '05/2.jpg'
			},
			{
				key: 'C',
				value: imgPath + '05/3.jpg'
			},
			{
				key: 'D',
				value: imgPath + '05/4.jpg'
			}
		],
		isTrue: 'B'
	},
	{
		type: 1,
		question: '哪个是正确灯位',
		answer: [
			{
				key: 'A',
				value: imgPath + '06/1.jpg'
			},
			{
				key: 'B',
				value: imgPath + '06/2.jpg'
			},
			{
				key: 'C',
				value: imgPath + '06/3.jpg'
			},
			{
				key: 'D',
				value: imgPath + '06/4.jpg'
			}
		],
		isTrue: 'D'
	},
	{
		type: 1,
		question: '以下哪种是正确做法',
		answer: [
			{
				key: 'A',
				value: imgPath + '07/1.jpg'
			},
			{
				key: 'B',
				value: imgPath + '07/2.jpg'
			},
			{
				key: 'C',
				value: imgPath + '07/3.jpg'
			},
			{
				key: 'D',
				value: imgPath + '07/4.jpg'
			}
		],
		isTrue: 'A'
	},
	{
		type: 1,
		question: '以下哪种是正确做法',
		answer: [
			{
				key: 'A',
				value: imgPath + '08/1.jpg'
			},
			{
				key: 'B',
				value: imgPath + '08/2.jpg'
			},
			{
				key: 'C',
				value: imgPath + '08/3.jpg'
			},
			{
				key: 'D',
				value: imgPath + '08/4.jpg'
			}
		],
		isTrue: 'C'
	},
	{
		type: 1,
		question: '以下哪种是正确做法',
		answer: [
			{
				key: 'A',
				value: imgPath + '09/1.jpg'
			},
			{
				key: 'B',
				value: imgPath + '09/2.jpg'
			},
			{
				key: 'C',
				value: imgPath + '09/3.jpg'
			},
			{
				key: 'D',
				value: imgPath + '09/4.jpg'
			}
		],
		isTrue: 'C'
	},
	{
		type: 2,
		question: '图中共有几个字',
		questionImg: imgPath + '10/1.png',
		answer: [
			{
				key: 'A',
				value: 13
			},
			{
				key: 'B',
				value: 14
			},
			{
				key: 'C',
				value: 12
			},
			{
				key: 'D',
				value: 18
			}
		],
		isTrue:'D'
	},
	{
		type: 1,
		question: '找出正确的logo',
		answer: [
			{
				key: 'A',
				value: imgPath + '11/1.jpg'
			},
			{
				key: 'B',
				value: imgPath + '11/2.jpg'
			},
			{
				key: 'C',
				value: imgPath + '11/3.jpg'
			},
			{
				key: 'D',
				value: imgPath + '11/4.jpg'
			}
		],
		isTrue: 'C'
	},
	{
		type: 1,
		question: '找出没有问题的葫芦娃',
		answer: [
			{
				key: 'A',
				value: imgPath + '12/1.jpg'
			},
			{
				key: 'B',
				value: imgPath + '12/2.jpg'
			},
			{
				key: 'C',
				value: imgPath + '12/3.jpg'
			},
			{
				key: 'D',
				value: imgPath + '12/4.jpg'
			}
		],
		isTrue: 'B'
	},
	{
		type: 1,
		question: '找出视觉从业者常用软件',
		answer: [
			{
				key: 'A',
				value: imgPath + '13/1.jpg'
			},
			{
				key: 'B',
				value: imgPath + '13/2.jpg'
			},
			{
				key: 'C',
				value: imgPath + '13/3.jpg'
			},
			{
				key: 'D',
				value: imgPath + '13/4.jpg'
			}
		],
		isTrue: 'B'
	},
	{
		type: 1,
		question: '找出设计师',
		answer: [
			{
				key: 'A',
				value: imgPath + '14/1.jpg'
			},
			{
				key: 'B',
				value: imgPath + '14/2.jpg'
			},
			{
				key: 'C',
				value: imgPath + '14/3.jpg'
			},
			{
				key: 'D',
				value: imgPath + '14/4.jpg'
			}
		],
		isTrue: 'C'
	},

];
