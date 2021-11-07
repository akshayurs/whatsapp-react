export const UsersList = [
  {
    name: 'Akshay',
    about: 'Busy',
    aboutUpdatedTime: 1634906110434,
    phoneNumber: '+91 987654321',
    profile: 'user.jpg',
    isOnline: true, // if false, lastSeen: timestamp should be added
    openedStatus: -1, // -1 for start from beginning
    statusViewed: false,
    messageIndex: 9, // last message index
    statusIndex: 7, // last status index
    userIndex: 0,
    callsIndex: 1, // last call index
    chatsList: [
      {
        index: 0,
        type: 2, // 1 for incoming , 2 for outgoing
        isReply: false, // ( optional for false) if true, replyFor: { index,type (1 to reply for your chat, 0 to reply for incoming chat),content,time} should be added
        content: 'Hi... ',
        time: 1635149523928,
      },
      {
        index: 1,
        type: 1,
        content: 'Hi 👋🏼',
        time: 1635149543928,
        status: 2,
      },
      {
        index: 2,
        type: 2,
        content: 'How can i edit chats or status?',
        time: 1635149543928,
        status: 2,
      },
      {
        index: 3,
        type: 1,
        isReply: true,
        replyFor: {
          index: 2,
          content: 'How can i edit chats or status?',
          type: 2,
        },
        content:
          'Click edit data in home screen drop-down menu and then click edit chats of that user',
        time: 1635149543928,
      },
      {
        index: 4,
        type: 2,
        content: 'Can i send images?',
        time: 1635149543928,
        status: 2,
      },
      {
        index: 5,
        type: 1,
        isReply: true,
        replyFor: {
          index: 4,
          content: 'Can i send images?',
        },
        content: 'Yes, you can',
        time: 1635149543928,
      },
      {
        index: 6,
        type: 1,
        showContent: false,
        isDocument: {
          type: 'image',
        },
        src: 'react.jpg',
        content: '<i class="fas fa-image"></i> Photo',
        time: 1635149543928,
      },
      {
        index: 7,
        type: 1,
        content: 'You can also send audio',
        time: 1635149543928,
      },
      {
        index: 8,
        type: 1,
        isDocument: {
          type: 'audio',
        },
        showContent: false,
        content: `<i class="fas fa-microphone mic "></i> audio`,
        time: 1635149543928,
        src: '/media/audio-sample.mp3',
        status: 2,
      },
      {
        index: 9,
        type: 2,
        content: 'Thank You 🙂',
        time: 1635149543928,
        status: 1,
      },
    ],
    calls: [
      {
        index: 0,
        time: 1635149552928,
        isIncomming: true,
        isVideo: true,
        isMissed: true,
      },
      {
        index: 1,
        time: 1635149853928,
        isIncomming: false,
        isVideo: false,
      },
    ],
    status: [
      {
        index: 1,
        src: '/sample-status/1.jpg',
        caption: 'Welcome to All',
        time: 1635149553928,
      },
      {
        index: 2,
        src: '/sample-status/2.jpg',
        caption: 'Prank your friends 😉',
        time: 1635149553928,
      },
      {
        index: 3,
        src: '/sample-status/3.jpg',
        caption: 'Use like a app',
        time: 1635159553928,
      },
      {
        index: 4,
        src: '/sample-status/4.jpg',
        caption: 'Must Explore 🔥',
        time: 1635949523928,
      },
      {
        index: 5,
        isVideo: true,
        src: '/sample-status/5.mp4',
        caption: 'Just to show it supports video 😅',
        time: 1635949523928,
      },
      {
        index: 6,
        src: '/sample-status/6.jpg',
        caption: 'Code available at Github @akshayurs',
        time: 1635949523928,
      },
      {
        index: 7,
        src: '/sample-status/7.jpg',
        caption: 'explore all features by yourself',
        time: 1635949523928,
      },
    ],
  },
  {
    name: "It's Unknown",
    about: 'Hey there i am using whatsapp',
    phoneNumber: '+91 0000000000',
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
    callsIndex: 0,
    calls: [
      {
        index: 0,
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
  {
    name: 'Mark',
    about: 'Hey there i brought whatsapp',
    phoneNumber: '+1 123456786',
    aboutUpdatedTime: 1635006110434,
    profile:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWU7LkS1EgkvoztMiiKVoB9oYxom8WtZGd_Ri2yJCY85qBqcscpttjYlK-pHccAZf_YA0&usqp=CAU',
    isOnline: false,
    lastSeen: 1635406110434,
    openedStatus: -1,
    statusViewed: false,
    userIndex: 2,
    messageIndex: 2,
    statusIndex: -1,
    callsIndex: -1,
    chatsList: [
      {
        index: 0,
        type: 2,
        content: 'He copied your whatsapp!!',
        time: 1635072621000,
        status: 2,
      },
      {
        index: 1,
        isReply: true,
        replyFor: {
          index: 0,
          content: 'He copied your whatsapp!!',
          type: 1,
        },
        type: 1,
        content: "It's just for fun",
        time: 1635072631000,
      },
      {
        index: 2,
        type: 1,
        content: "It's a nice copy, But it won't connect to internet 🙁",
        time: 1635072631000,
      },
    ],
    calls: [],
    status: [],
  },
]

export const metaData = {
  name: 'You',
  about: 'Hey there! I am using WhatsApp',
  aboutUpdatedTime: 1635006110434,
  profile: 'default.jpg',
  lastUserIndex: 2, //change no number of default contacts at first time
  statusIndex: 0, // last index of status
  status: [], // status:{ index,src,caption,time}
}
