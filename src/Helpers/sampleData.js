export const UsersList = [
  {
    name: 'Akshay',
    about: 'Busy',
    aboutUpdatedTime: 1634906110434,
    phoneNumber: '+91 987654321',
    profile: 'user.jpg',
    isOnline: true,
    openedStatus: -1,
    statusViewed: false,
    messageIndex: 4,
    statusIndex: 4,
    userIndex: 0,
    chatsList: [
      {
        index: 0,
        type: 1,
        content: 'Hi 👋🏼',
        time: 1635149523928,
      },
      {
        index: 1,
        type: 2,
        content: 'Hi...',
        time: 1635149543928,
        status: 2,
      },
      {
        index: 2,
        type: 1,
        content: 'How are you?',
        time: 1635149553928,
      },
      {
        index: 3,
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
        index: 4,
        type: 2,
        content: 'Good Morning 🌞',
        time: 1635190583928,
        status: 2,
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
        index: 1,
        src: 'welcome.jpg',
        caption: 'Welcome to All',
        time: 1635149553928,
      },
      {
        index: 2,
        src: 'background.png',
        caption: 'this is background',
        time: 1635149553928,
      },
      {
        index: 3,
        isVideo: true,
        src: 'samplemusic.mp4',
        caption: 'im video',
        time: 1635159553928,
      },
      {
        index: 4,
        src: 'githubbackground.jpg',
        caption: 'Code available on Github',
        time: 1635949523928,
      },
    ],
  },
  {
    name: 'UnKnown',
    about: 'Hey there i am using whatsapp',
    phoneNumber: '+91 8975643213',
    aboutUpdatedTime: 1635006110434,
    profile: 'default.jpg',
    isOnline: false,
    lastSeen: 1635406110434,
    chatsList: [],
    openedStatus: -1,
    statusViewed: false,
    userIndex: 1,
    messageIndex: 0,
    statusIndex: 0,
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
        index: 0,
        src: 'https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255634-stock-illustration-avatar-icon-male-profile-gray.jpg',
        caption: 'im unknown',
        time: 1635149453928,
      },
    ],
  },
]

export const metaData = {
  name: 'You',
  about: 'Hey there i am using whatsapp',
  aboutUpdatedTime: 1635006110434,
  profile: 'default.jpg',
  lastUserIndex: 1, //TODO: change this according to defalut user
}
