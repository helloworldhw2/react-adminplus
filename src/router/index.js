const router = [
  {
    title: '控制台',
    icon: 'UserSwitchOutlined ',
    key: '/index'
  },
  {
    title: '用户管理',
    icon: 'UserSwitchOutlined ',
    key: '/index/user',
    children: [
      {key: '/index/user/list', title: '用户列表', icon: ''},
      {
        key: '/index/user/add',
        title: '添加用户',
        icon: '',
        // children: [
        //   {key: '/index/user/add/demo1', title: '用户列表', icon: ''},
        //   {
        //     key: '/index/user/add/demo2',
        //     title: '添加用户',
        //     icon: ''
        //   }
        // ]
      }
    ]
  },
  {
    title: '部门管理',
    icon: 'UserSwitchOutlined ',
    key: '/index/department',
    children: [
      {key: '/index/department/list', title: '部门列表', icon: ''},
      {key: '/index/department/add', title: '添加部门', icon: '',},
    ]
  },
  {
    title: '职位管理',
    icon: 'UserSwitchOutlined',
    key: '/home/entry',
    children: [
      {key: '/home/entry/form/basic-form', title: '职位列表', icon: ''},
      {key: '/home/entry/form/basic-forma', title: '添加职位', icon: ''},
    ]
  },
  {
    title: '请假',
    icon: 'info-circle-o',
    key: '/home/abouta',
  },
  {
    title: '加班',
    icon: 'info-circle-0',
    key: '/home/about',
  },
]
    
export default router