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
        time: 1635149523928,
      },
      {
        index: 2,
        type: 2,
        content: 'Hi...',
        time: 1635149543928,
        status: 2,
      },
      {
        index: 3,
        type: 1,
        content: 'How are you?',
        time: 1635149553928,
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
        time: 1635149563928,
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
        time: 1635149583928,
        status: 0,
      },
    ],
    calls: [
      {
        time: 1635149552928,
        isIncomming: true,
        isVideo: true,
        isMissed: true,
      },
      {
        time: 1635149853928,
        isIncomming: false,
        isVideo: false,
      },
    ],
    status: [
      {
        img: 'welcome.jpg',
        caption: 'Welcome to All',
        time: 1635149553928,
      },
      {
        img: 'background.png',
        caption: 'this is background',
        time: 1635149553928,
      },
      {
        img: 'githubbackground.jpg',
        caption: 'Code available on Github',
        time: 1635149523928,
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
        time: 1635149553928,
        isIncomming: true,
        isVideo: false,
        isMissed: true,
      },
    ],
    status: [
      {
        img: 'https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255634-stock-illustration-avatar-icon-male-profile-gray.jpg',
        caption: 'im unknown',
        time: 1635149453928,
      },
    ],
  },
]
