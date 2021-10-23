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
    messageIndex: 8,
    userIndex: 0,
    chatsList: [
      {
        index: 0,
        type: 0,
        content: 'Yesterday',
      },
      {
        index: 1,
        type: 1,
        content: 'Hi 👋🏼',
        time: '10:30 AM',
      },
      {
        index: 2,
        type: 2,
        content: 'Hi...',
        time: '10:31 AM',
        status: 2,
      },
      {
        index: 3,
        type: 1,
        content: 'How are you?',
        time: '10:31 AM',
      },
      {
        index: 4,
        type: 2,
        isReply: true,
        replyFor: {
          type: 1,
          content: 'How are you?',
          index: 10,
        },
        content: 'Fine',
        time: '10:31 PM',
        status: 1,
      },
      {
        index: 5,
        type: 0,
        content: 'Today',
      },
      {
        index: 6,
        type: 2,
        content: 'Good Morning 🌞',
        time: '6:02 AM',
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
    chatsList: [
      {
        index: 0,
        type: 0,
        content: 'Today',
      },
    ],
    openedStatus: 0,
    statusViewed: false,
    userIndex: 1,
    messageIndex: 0,
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
        img: 'https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255634-stock-illustration-avatar-icon-male-profile-gray.jpg',
        caption: 'im unknown',
        time: '11:55 PM',
      },
    ],
  },
]
