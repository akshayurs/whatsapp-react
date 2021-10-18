export const UsersList = [
  {
    name: 'Akshay',
    about: 'Busy',
    aboutUpdatedTime: 'October 14',
    phoneNumber: '+91 987654321',
    profile: 'user.jpg',
    isOnline: true,
    lastSeen: '',
    openedStatus: 0,
    statusViewed: false,
    messageIndex: 4,
    userIndex: 0,
    chatsList: [
      {
        index: 0,
        type: 0,
        content: 'Yesterday',
      },
      {
        index: 1,
        type: 2,
        content: 'HI',
        time: '10:30 AM',
        status: 2,
      },
      {
        index: 2,
        type: 2,
        isReply: true,
        replyFor: {
          type: 0,
          content: 'HI',
          index: 1,
        },
        content: 'Good Morning',
        time: '10:31 AM',
        status: 1,
      },
      {
        index: 3,
        type: 1,
        content: 'Good Morning',
        time: '10:31 AM',
      },
      {
        index: 4,
        type: 2,
        isReply: true,
        replyFor: {
          type: 1,
          content: 'Good Morning',
          index: 2,
        },
        content:
          'okasd asd adsa das ddddda dsa d d sad sad  asd asd sa asd AS ADS',
        time: '12:20 PM',
        status: 0,
      },
    ],
    calls: [
      {
        time: '10:30 AM',
        isIncomming: true,
        isVideo: true,
        isMissed: true,
      },
      {
        time: '10:32 AM',
        isIncomming: false,
        isVideo: false,
      },
    ],
    status: [
      {
        img: 'welcome.jpg',
        caption: 'Welcome to All',
        time: '10:30 PM',
      },
      {
        img: 'background.png',
        caption: 'this is background',
        time: '11:50 PM',
      },
      {
        img: 'githubbackground.jpg',
        caption: 'Code available on Github',
        time: '11:55 PM',
      },
    ],
  },
  {
    name: 'UnKnown',
    about: 'Hey there i am using whatsapp',
    phoneNumber: '+91 8975643213',
    aboutUpdatedTime: 'November 20',
    profile: 'profile.jpg',
    isOnline: false,
    lastSeen: 'Today 6:36 AM',
    chatsList: [],
    openedStatus: 0,
    statusViewed: false,
    userIndex: 1,
    messageIndex: -1,
    calls: [
      {
        time: '2 October 12:30 PM',
        isIncomming: true,
        isVideo: false,
        isMissed: true,
      },
    ],
    status: [
      {
        img: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
        caption: '',
        time: '11:55 PM',
      },
    ],
  },
]
