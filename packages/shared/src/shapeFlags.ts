export const enum ShapeFlags {
  /**
   * 组件
   */
  ELEMENT = 1,
  /**
   * 功能组件
   * 2
   */
  FUNCTIONAL_COMPONENT = 1 << 1,
  /**
   * 有状态的组件
   * 4
   */
  STATEFUL_COMPONENT = 1 << 2,
  /**
   * 文字子类
   * 8
   */
  TEXT_CHILDREN = 1 << 3,
  /**
   * 数组子类
   * 16
   */
  ARRAY_CHILDREN = 1 << 4,
  /**
   * 插槽子类
   * 32
   */
  SLOTS_CHILDREN = 1 << 5,
  /**
   * 64
   */
  TELEPORT = 1 << 6,
  /**
   * 128
   */
  SUSPENSE = 1 << 7,
  /**
   * 256
   */
  COMPONENT_SHOULD_KEEP_ALIVE = 1 << 8,
  /**
   * 512
   */
  COMPONENT_KEPT_ALIVE = 1 << 9,
  /**
   * 4 | 2
   */
  COMPONENT = ShapeFlags.STATEFUL_COMPONENT | ShapeFlags.FUNCTIONAL_COMPONENT
}
