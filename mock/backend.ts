/**
 * 本地开发用的内存 Mock 后端。
 *
 * 数据仅保存在 Vite 开发服务器进程中；重启 `pnpm dev` 会恢复为下面的示例数据。
 */
const now = () => new Date().toLocaleString('zh-CN', { hour12: false })
const ok = (data: unknown = null, message = '成功') => ({
  code: 200,
  message,
  ok: true,
  data,
})
const page = <T>(items: T[], current = 1, size = 10) => {
  const start = (Number(current) - 1) * Number(size)
  return {
    records: items.slice(start, start + Number(size)),
    total: items.length,
    size: Number(size),
    current: Number(current),
    pages: Math.max(1, Math.ceil(items.length / Number(size))),
    searchCount: true,
  }
}

let nextId = 1000
const id = () => ++nextId
const image = (seed: string) =>
  `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><rect width="100%" height="100%" fill="#409eff"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="sans-serif" font-size="28">${seed}</text></svg>`)}`

const brands = [
  { id: 1, tmName: '苹果', logoUrl: image('Apple') },
  { id: 2, tmName: '华为', logoUrl: image('Huawei') },
  { id: 3, tmName: '小米', logoUrl: image('Xiaomi') },
  { id: 4, tmName: '联想', logoUrl: image('Lenovo') },
  { id: 5, tmName: '索尼', logoUrl: image('Sony') },
  { id: 6, tmName: '戴尔', logoUrl: image('Dell') },
]

const category1 = [
  { id: 1, name: '手机数码' },
  { id: 2, name: '电脑办公' },
  { id: 3, name: '家用电器' },
]
const category2: Record<
  number,
  { id: number; name: string; category1Id: number }[]
> = {
  1: [
    { id: 11, name: '手机通讯', category1Id: 1 },
    { id: 12, name: '摄影摄像', category1Id: 1 },
  ],
  2: [
    { id: 21, name: '电脑整机', category1Id: 2 },
    { id: 22, name: '电脑配件', category1Id: 2 },
  ],
  3: [
    { id: 31, name: '电视', category1Id: 3 },
    { id: 32, name: '生活电器', category1Id: 3 },
  ],
}
const category3: Record<
  number,
  { id: number; name: string; category2Id: number }[]
> = {
  11: [
    { id: 111, name: '智能手机', category2Id: 11 },
    { id: 112, name: '老人机', category2Id: 11 },
  ],
  12: [{ id: 121, name: '数码相机', category2Id: 12 }],
  21: [
    { id: 211, name: '笔记本电脑', category2Id: 21 },
    { id: 212, name: '台式机', category2Id: 21 },
  ],
  22: [{ id: 221, name: '显示器', category2Id: 22 }],
  31: [{ id: 311, name: '智能电视', category2Id: 31 }],
  32: [{ id: 321, name: '空气净化器', category2Id: 32 }],
}

let attrs: any[] = [
  {
    id: 301,
    attrName: '机身颜色',
    categoryId: 111,
    categoryLevel: 3,
    attrValueList: [
      { id: 3011, valueName: '曜石黑', attrId: 301 },
      { id: 3012, valueName: '雪山白', attrId: 301 },
    ],
  },
  {
    id: 302,
    attrName: '运行内存',
    categoryId: 111,
    categoryLevel: 3,
    attrValueList: [
      { id: 3021, valueName: '8GB', attrId: 302 },
      { id: 3022, valueName: '12GB', attrId: 302 },
    ],
  },
  {
    id: 303,
    attrName: '屏幕尺寸',
    categoryId: 211,
    categoryLevel: 3,
    attrValueList: [
      { id: 3031, valueName: '14英寸', attrId: 303 },
      { id: 3032, valueName: '16英寸', attrId: 303 },
    ],
  },
]

let spus: any[] = [
  {
    id: 401,
    spuName: '旗舰智能手机',
    description: '高性能 5G 智能手机',
    category3Id: 111,
    tmId: 2,
    spuImageList: [{ id: 4011, imgName: '手机正面', imgUrl: image('Phone') }],
    spuSaleAttrList: [
      {
        id: 4012,
        baseSaleAttrId: 1,
        saleAttrName: '颜色',
        spuSaleAttrValueList: [
          { id: 40121, baseSaleAttrId: 1, saleAttrValueName: '曜石黑' },
          { id: 40122, baseSaleAttrId: 1, saleAttrValueName: '雪山白' },
        ],
      },
    ],
  },
  {
    id: 402,
    spuName: '轻薄商务笔记本',
    description: '便携高效办公本',
    category3Id: 211,
    tmId: 4,
    spuImageList: [{ id: 4021, imgName: '笔记本', imgUrl: image('Laptop') }],
    spuSaleAttrList: [
      {
        id: 4022,
        baseSaleAttrId: 1,
        saleAttrName: '颜色',
        spuSaleAttrValueList: [
          { id: 40221, baseSaleAttrId: 1, saleAttrValueName: '深空灰' },
        ],
      },
    ],
  },
]
let skus: any[] = [
  {
    id: 501,
    category3Id: 111,
    spuId: 401,
    tmId: 2,
    skuName: '旗舰智能手机 12GB+256GB',
    price: 3999,
    weight: 188,
    skuDesc: '曜石黑',
    skuDefaultImg: image('Phone'),
    isSale: 1,
    skuAttrValueList: [],
    skuSaleAttrValueList: [],
  },
  {
    id: 502,
    category3Id: 211,
    spuId: 402,
    tmId: 4,
    skuName: '轻薄商务笔记本 16GB+512GB',
    price: 5999,
    weight: 1350,
    skuDesc: '深空灰',
    skuDefaultImg: image('Laptop'),
    isSale: 0,
    skuAttrValueList: [],
    skuSaleAttrValueList: [],
  },
]

let roles: any[] = [
  {
    id: 1,
    roleName: '超级管理员',
    remark: null,
    permissionIds: [],
    createTime: now(),
    updateTime: now(),
  },
  {
    id: 2,
    roleName: '商品运营',
    remark: null,
    permissionIds: [
      20, 21, 22, 23, 24, 25, 211, 212, 213, 214, 221, 222, 223, 224, 231, 232,
      233, 234, 235, 241, 242, 243, 244,
    ],
    createTime: now(),
    updateTime: now(),
  },
  {
    id: 3,
    roleName: '内容编辑',
    remark: null,
    permissionIds: [1, 2],
    createTime: now(),
    updateTime: now(),
  },
]
let users: any[] = [
  {
    id: 1,
    username: 'admin',
    password: '111111',
    name: '系统管理员',
    roleName: '超级管理员',
    roleIds: [1],
    createTime: now(),
    updateTime: now(),
  },
  {
    id: 2,
    username: 'operator',
    password: '111111',
    name: '商品运营员',
    roleName: '商品运营',
    roleIds: [2],
    createTime: now(),
    updateTime: now(),
  },
]
const permission = (
  id: number,
  pid: number,
  name: string,
  code: string | null,
  level: number,
  children: any[] = [],
) => ({
  id,
  pid,
  name,
  code,
  level,
  type: level === 4 ? 2 : 1,
  status: null,
  toCode: null,
  select: true,
  createTime: now(),
  updateTime: now(),
  children,
})
const buttons = (parentId: number, startId: number, labels: string[]) =>
  labels.map((label, index) =>
    permission(
      startId + index,
      parentId,
      label,
      `btn.${parentId}.${index + 1}`,
      4,
    ),
  )
// 与 src/router/routes.ts 中的全部后台菜单一一对应，供“菜单管理”和“角色分配权限”使用。
let permissions: any[] = [
  permission(1, 0, '首页', 'Home', 1),
  permission(2, 0, '数据大屏', 'Screen', 1),
  permission(10, 0, '权限管理', 'Acl', 1, [
    permission(
      11,
      10,
      '用户管理',
      'User',
      2,
      buttons(11, 111, [
        '查看用户',
        '新增用户',
        '修改用户',
        '删除用户',
        '分配角色',
      ]),
    ),
    permission(
      12,
      10,
      '角色管理',
      'Role',
      2,
      buttons(12, 121, [
        '查看角色',
        '新增角色',
        '修改角色',
        '删除角色',
        '分配权限',
      ]),
    ),
    permission(
      13,
      10,
      '菜单管理',
      'Permission',
      2,
      buttons(13, 131, ['查看菜单', '新增菜单', '修改菜单', '删除菜单']),
    ),
  ]),
  permission(20, 0, '商品管理', 'Product', 1, [
    permission(
      21,
      20,
      '品牌管理',
      'Trademark',
      2,
      buttons(21, 211, ['查看品牌', '新增品牌', '修改品牌', '删除品牌']),
    ),
    permission(
      22,
      20,
      '属性管理',
      'Attr',
      2,
      buttons(22, 221, ['查看属性', '新增属性', '修改属性', '删除属性']),
    ),
    permission(
      23,
      20,
      'SPU管理',
      'Spu',
      2,
      buttons(23, 231, ['查看SPU', '新增SPU', '修改SPU', '删除SPU', '新增SKU']),
    ),
    permission(
      24,
      20,
      'SKU管理',
      'Sku',
      2,
      buttons(24, 241, ['查看SKU', '上架SKU', '下架SKU', '删除SKU']),
    ),
    permission(25, 20, '测试无限滚动', 'Scoll', 2),
  ]),
]

const findPermission = (nodes: any[], target: number): any => {
  for (const node of nodes) {
    if (node.id === target) return node
    const found = findPermission(node.children || [], target)
    if (found) return found
  }
}
const removeFromTree = (nodes: any[], target: number): boolean => {
  const index = nodes.findIndex((node) => node.id === target)
  if (index >= 0) return !!nodes.splice(index, 1)
  return nodes.some((node) => removeFromTree(node.children || [], target))
}
const clonePermissionTree = (nodes: any[], selectedIds: number[]) =>
  nodes.map((node): any => ({
    ...node,
    select: selectedIds.includes(node.id),
    children: clonePermissionTree(node.children || [], selectedIds),
  }))
const collectPermissionIds = (nodes: any[]): number[] =>
  nodes.flatMap((node) => [
    node.id,
    ...collectPermissionIds(node.children || []),
  ])
roles[0].permissionIds = collectPermissionIds(permissions)
const skuDetails = (sku: any) => {
  const spu = spus.find((item) => item.id === sku.spuId)
  return {
    ...sku,
    skuImageList: spu?.spuImageList || [],
    skuAttrValueList: (sku.skuAttrValueList || []).map((value: any) => {
      const attr = attrs.find(
        (item) => String(item.id) === String(value.attrId),
      )
      const attrValue = attr?.attrValueList.find(
        (item: any) => String(item.id) === String(value.valueId),
      )
      return {
        ...value,
        valueName: attrValue?.valueName || value.valueName || '未设置',
      }
    }),
    skuSaleAttrValueList: (sku.skuSaleAttrValueList || []).map((value: any) => {
      const saleAttr = spu?.spuSaleAttrList?.find(
        (item: any) => String(item.id) === String(value.saleAttrId),
      )
      const saleAttrValue = saleAttr?.spuSaleAttrValueList.find(
        (item: any) => String(item.id) === String(value.saleAttrValueId),
      )
      return {
        ...value,
        saleAttrValueName:
          saleAttrValue?.saleAttrValueName ||
          value.saleAttrValueName ||
          '未设置',
      }
    }),
  }
}

export default [
  {
    url: '/api/admin/acl/index/login',
    method: 'post',
    response: ({ body }: any) => {
      const account = users.find(
        (user) =>
          user.username === body?.username &&
          (body?.password === user.password || body?.password === '123456'),
      )
      return account
        ? ok(`mock-token-${account.id}`)
        : { code: 201, message: '用户名或密码错误', ok: false, data: '' }
    },
  },
  {
    url: '/api/admin/acl/index/info',
    method: 'get',
    response: ({ headers }: any) => {
      const account =
        users.find((user) => `mock-token-${user.id}` === headers?.token) ||
        users[0]
      return ok({
        name: account.name,
        avatar: image(account.name),
        route: 'home',
        button: 'btn.Trademark.add',
      })
    },
  },
  { url: '/api/admin/acl/index/logout', method: 'post', response: () => ok() },

  {
    url: /^\/api\/admin\/product\/baseTrademark\/\d+\/\d+$/,
    method: 'get',
    response: ({ url }: any) => {
      const [, current, size] = url.match(/baseTrademark\/(\d+)\/(\d+)/)
      return ok(page(brands, current, size))
    },
  },
  {
    url: '/api/admin/product/baseTrademark/save',
    method: 'post',
    response: ({ body }: any) => {
      brands.push({ ...body, id: id() })
      return ok()
    },
  },
  {
    url: '/api/admin/product/baseTrademark/update',
    method: 'put',
    response: ({ body }: any) => {
      const item = brands.find((brand) => brand.id === body.id)
      if (item) Object.assign(item, body)
      return ok()
    },
  },
  {
    url: /^\/api\/admin\/product\/baseTrademark\/remove\/\d+$/,
    method: 'delete',
    response: ({ url }: any) => {
      const itemId = Number(url.split('/').pop())
      const index = brands.findIndex((brand) => brand.id === itemId)
      if (index >= 0) brands.splice(index, 1)
      return ok()
    },
  },
  {
    url: '/api/admin/product/fileUpload',
    method: 'post',
    response: () => ok(image('Upload')),
  },

  {
    url: '/api/admin/product/getCategory1',
    method: 'get',
    response: () => ok(category1),
  },
  {
    url: /^\/api\/admin\/product\/getCategory2\/\d+$/,
    method: 'get',
    response: ({ url }: any) =>
      ok(category2[Number(url.split('/').pop())] || []),
  },
  {
    url: /^\/api\/admin\/product\/getCategory3\/\d+$/,
    method: 'get',
    response: ({ url }: any) =>
      ok(category3[Number(url.split('/').pop())] || []),
  },
  {
    url: /^\/api\/admin\/product\/attrInfoList\/\d+\/\d+\/\d+$/,
    method: 'get',
    response: ({ url }: any) =>
      ok(
        attrs.filter(
          (attr) => attr.categoryId === Number(url.split('/').pop()),
        ),
      ),
  },
  {
    url: '/api/admin/product/saveAttrInfo',
    method: 'post',
    response: ({ body }: any) => {
      const record = attrs.find((attr) => attr.id === body.id)
      const attrValueList = (body.attrValueList || []).map((value: any) => ({
        ...value,
        id: value.id || id(),
      }))
      if (record) Object.assign(record, body, { attrValueList })
      else attrs.push({ ...body, id: id(), attrValueList })
      return ok()
    },
  },
  {
    url: /^\/api\/admin\/product\/deleteAttr\/?\d+$/,
    method: 'delete',
    response: ({ url }: any) => {
      const itemId = Number(url.match(/\d+$/)?.[0])
      attrs = attrs.filter((attr) => attr.id !== itemId)
      return ok()
    },
  },

  {
    url: /^\/api\/admin\/product\/\d+\/\d+$/,
    method: 'get',
    response: ({ url }: any) => {
      const match = url.match(/product\/(\d+)\/(\d+)/)
      const query = new URL(url, 'http://mock').searchParams
      const result = spus.filter(
        (spu) => String(spu.category3Id) === query.get('category3Id'),
      )
      return ok(page(result, match?.[1], match?.[2]))
    },
  },
  {
    url: '/api/admin/product/baseTrademark/getTrademarkList',
    method: 'get',
    response: () => ok(brands),
  },
  {
    url: /^\/api\/admin\/product\/spuImageList\/\d+$/,
    method: 'get',
    response: ({ url }: any) =>
      ok(
        spus.find((spu) => spu.id === Number(url.split('/').pop()))
          ?.spuImageList || [],
      ),
  },
  {
    url: /^\/api\/admin\/product\/spuSaleAttrList\/\d+$/,
    method: 'get',
    response: ({ url }: any) =>
      ok(
        spus.find((spu) => spu.id === Number(url.split('/').pop()))
          ?.spuSaleAttrList || [],
      ),
  },
  {
    url: '/api/admin/product/baseSaleAttrList',
    method: 'get',
    response: () =>
      ok([
        { id: 1, name: '颜色' },
        { id: 2, name: '版本' },
        { id: 3, name: '套餐' },
      ]),
  },
  {
    url: '/api/admin/product/saveSpuInfo',
    method: 'post',
    response: ({ body }: any) => {
      spus.push({ ...body, id: id() })
      return ok()
    },
  },
  {
    url: '/api/admin/product/updateSpuInfo',
    method: 'post',
    response: ({ body }: any) => {
      const item = spus.find((spu) => spu.id === body.id)
      if (item) Object.assign(item, body)
      return ok()
    },
  },
  {
    url: '/api/admin/product/saveSkuInfo',
    method: 'post',
    response: ({ body }: any) => {
      skus.push({ ...body, id: id(), isSale: 0 })
      return ok()
    },
  },
  {
    url: '/api/admin/product/updateSkuInfo',
    method: 'put',
    response: ({ body }: any) => {
      const sku = skus.find((item) => item.id === body.id)
      if (sku) Object.assign(sku, body)
      return ok()
    },
  },
  {
    url: /^\/api\/admin\/product\/findBySpuId\/\d+$/,
    method: 'get',
    response: ({ url }: any) =>
      ok(skus.filter((sku) => sku.spuId === Number(url.split('/').pop()))),
  },
  {
    url: /^\/api\/admin\/product\/deleteSpu\/\d+$/,
    method: 'delete',
    response: ({ url }: any) => {
      const itemId = Number(url.split('/').pop())
      spus = spus.filter((spu) => spu.id !== itemId)
      skus = skus.filter((sku) => sku.spuId !== itemId)
      return ok()
    },
  },
  {
    url: /^\/api\/admin\/product\/list\/\d+\/\d+$/,
    method: 'get',
    response: ({ url }: any) => {
      const [, current, size] = url.match(/list\/(\d+)\/(\d+)/)
      return ok(page(skus, current, size))
    },
  },
  {
    url: /^\/api\/admin\/product\/(onSale|cancelSale)\/\d+$/,
    method: 'get',
    response: ({ url }: any) => {
      const item = skus.find((sku) => sku.id === Number(url.split('/').pop()))
      if (item) item.isSale = url.includes('/onSale/') ? 1 : 0
      return ok()
    },
  },
  {
    url: /^\/api\/admin\/product\/getSkuInfo\/\d+$/,
    method: 'get',
    response: ({ url }: any) =>
      ok(
        skuDetails(
          skus.find((sku) => sku.id === Number(url.split('/').pop())) || {},
        ),
      ),
  },
  {
    url: /^\/api\/admin\/product\/deleteSku\/\d+$/,
    method: 'delete',
    response: ({ url }: any) => {
      const itemId = Number(url.split('/').pop())
      skus = skus.filter((sku) => sku.id !== itemId)
      return ok()
    },
  },

  {
    url: /^\/api\/acl\/user\/\d+\/\d+\/$/,
    method: 'get',
    response: ({ url }: any) => {
      const match = url.match(/user\/(\d+)\/(\d+)/)
      const keyword =
        new URL(url, 'http://mock').searchParams.get('username') || ''
      return ok(
        page(
          users.filter((user) => user.username.includes(keyword)),
          match?.[1],
          match?.[2],
        ),
      )
    },
  },
  {
    url: '/api/acl/user/save',
    method: 'post',
    response: ({ body }: any) => {
      users.push({
        ...body,
        id: id(),
        roleName: '未分配',
        roleIds: [],
        createTime: now(),
        updateTime: now(),
      })
      return ok()
    },
  },
  {
    url: '/api/acl/user/update',
    method: 'put',
    response: ({ body }: any) => {
      const user = users.find((item) => item.id === body.id)
      if (user) Object.assign(user, body, { updateTime: now() })
      return ok()
    },
  },
  {
    url: /^\/api\/acl\/user\/toAssign\/\d+$/,
    method: 'get',
    response: ({ url }: any) => {
      const user = users.find(
        (item) => item.id === Number(url.split('/').pop()),
      )
      return ok({
        allRolesList: roles,
        assignRoles: roles.filter((role) => user?.roleIds?.includes(role.id)),
      })
    },
  },
  {
    url: '/api/acl/user/doAssignRole',
    method: 'post',
    response: ({ body }: any) => {
      const user = users.find((item) => item.id === body.userId)
      if (user) {
        user.roleIds = body.roleIdList
        user.roleName =
          roles
            .filter((role) => body.roleIdList.includes(role.id))
            .map((role) => role.roleName)
            .join('、') || '未分配'
      }
      return ok()
    },
  },
  {
    url: /^\/api\/acl\/user\/remove\/\d+$/,
    method: 'delete',
    response: ({ url }: any) => {
      const itemId = Number(url.split('/').pop())
      users = users.filter((user) => user.id !== itemId)
      return ok()
    },
  },
  {
    url: '/api/acl/user/batchRemove',
    method: 'delete',
    response: ({ body }: any) => {
      users = users.filter((user) => !body.includes(user.id))
      return ok()
    },
  },

  {
    url: /^\/api\/admin\/acl\/role\/\d+\/\d+\/$/,
    method: 'get',
    response: ({ url }: any) => {
      const match = url.match(/role\/(\d+)\/(\d+)/)
      const keyword =
        new URL(url, 'http://mock').searchParams.get('roleName') || ''
      return ok(
        page(
          roles.filter((role) => role.roleName.includes(keyword)),
          match?.[1],
          match?.[2],
        ),
      )
    },
  },
  {
    url: '/api/admin/acl/role/save',
    method: 'post',
    response: ({ body }: any) => {
      roles.push({
        ...body,
        id: id(),
        permissionIds: [],
        createTime: now(),
        updateTime: now(),
      })
      return ok()
    },
  },
  {
    url: '/api/admin/acl/role/update',
    method: 'put',
    response: ({ body }: any) => {
      const role = roles.find((item) => item.id === body.id)
      if (role) Object.assign(role, body, { updateTime: now() })
      return ok()
    },
  },
  {
    url: /^\/api\/admin\/acl\/role\/remove\/\d+$/,
    method: 'delete',
    response: ({ url }: any) => {
      const itemId = Number(url.split('/').pop())
      roles = roles.filter((role) => role.id !== itemId)
      users.forEach((user) => {
        if (user.roleIds.includes(itemId)) {
          user.roleIds = user.roleIds.filter(
            (roleId: number) => roleId !== itemId,
          )
          user.roleName =
            roles
              .filter((role) => user.roleIds.includes(role.id))
              .map((role) => role.roleName)
              .join('、') || '未分配'
        }
      })
      return ok()
    },
  },
  {
    url: /^\/api\/admin\/acl\/permission\/toAssign\/\d+$/,
    method: 'get',
    response: ({ url }: any) => {
      const role = roles.find(
        (item) => item.id === Number(url.split('/').pop()),
      )
      return ok(clonePermissionTree(permissions, role?.permissionIds || []))
    },
  },
  {
    url: /^\/api\/admin\/acl\/permission\/doAssign\//,
    method: 'post',
    response: ({ url }: any) => {
      const query = new URL(url, 'http://mock').searchParams
      const role = roles.find((item) => item.id === Number(query.get('roleId')))
      if (role)
        role.permissionIds = (query.get('permissionId') || '')
          .split(',')
          .filter(Boolean)
          .map(Number)
      return ok()
    },
  },
  {
    url: '/api/admin/acl/permission',
    method: 'get',
    response: () => ok(permissions),
  },
  {
    url: '/api/admin/acl/permission/save',
    method: 'post',
    response: ({ body }: any) => {
      const parent = findPermission(permissions, body.pid)
      const item = {
        ...body,
        id: id(),
        type: body.level === 4 ? 2 : 1,
        select: false,
        status: null,
        toCode: null,
        createTime: now(),
        updateTime: now(),
        children: [],
      }
      if (parent) {
        parent.children ||= []
        parent.children.push(item)
      } else permissions.push(item)
      return ok()
    },
  },
  {
    url: '/api/admin/acl/permission/update',
    method: 'put',
    response: ({ body }: any) => {
      const item = findPermission(permissions, body.id)
      if (item) Object.assign(item, body, { updateTime: now() })
      return ok()
    },
  },
  {
    url: /^\/api\/admin\/acl\/permission\/remove\/\d+$/,
    method: 'delete',
    response: ({ url }: any) => {
      const itemId = Number(url.split('/').pop())
      const removed = findPermission(permissions, itemId)
      const removedIds = removed ? collectPermissionIds([removed]) : []
      removeFromTree(permissions, itemId)
      roles.forEach((role) => {
        role.permissionIds = role.permissionIds.filter(
          (permissionId: number) => !removedIds.includes(permissionId),
        )
      })
      return ok()
    },
  },
]
