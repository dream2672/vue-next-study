// This entry is the "full-build" that includes both the runtime
// and the compiler, and supports on-the-fly compilation of the template option.
import { initDev } from './dev'
import { compile, CompilerOptions, CompilerError } from '@vue/compiler-dom'
import { registerRuntimeCompiler, RenderFunction, warn } from '@vue/runtime-dom'
import * as runtimeDom from '@vue/runtime-dom'
import { isString, NOOP, generateCodeFrame, extend } from '@vue/shared'
import { InternalRenderFunction } from 'packages/runtime-core/src/component'
// 初始化dev环境
__DEV__ && initDev()

// 创建编译缓存
const compileCache: Record<string, RenderFunction> = Object.create(null)

/**
 * 模版编译 template转化为render
 * 在实际的组件使用中，只使用render函数做为渲染方式
 * creatApp的时候， 可以传入template或者render，其中render优先级大于template，在template和render同时存在时，只使用render，不处理template
 * @params template { string | HTMLElement} template有3种选择，可以为一段html代码，也可以为一个id节点名（需以#为开头），或者一个具体的dom节点
 * @params options 编译参数，参数分为Parser， Transform ，Codegen 三个部分。在编译的时候，再具体细说
 */
function compileToFunction(
  template: string | HTMLElement,
  options?: CompilerOptions
): RenderFunction {
  if (!isString(template)) {
    if (template.nodeType) {
      template = template.innerHTML
    } else {
      __DEV__ && warn(`invalid template option: `, template)
      return NOOP
    }
  }

  const key = template
  const cached = compileCache[key]
  if (cached) {
    return cached
  }

  if (template[0] === '#') {
    const el = document.querySelector(template)
    if (__DEV__ && !el) {
      warn(`Template element not found or is empty: ${template}`)
    }
    // __UNSAFE__
    // Reason: potential execution of JS expressions in in-DOM template.
    // The user must make sure the in-DOM template is trusted. If it's rendered
    // by the server, the template should not contain any user data.
    template = el ? el.innerHTML : ``
  }
  // 编译核心函数，跳转到packages/compiler-dom/src/index.ts
  const { code } = compile(
    template,
    extend(
      {
        hoistStatic: true,
        onError(err: CompilerError) {
          if (__DEV__) {
            const message = `Template compilation error: ${err.message}`
            const codeFrame =
              err.loc &&
              generateCodeFrame(
                template as string,
                err.loc.start.offset,
                err.loc.end.offset
              )
            warn(codeFrame ? `${message}\n${codeFrame}` : message)
          } else {
            /* istanbul ignore next */
            throw err
          }
        },
      },
      options
    )
  )

  // The wildcard import results in a huge object with every export
  // with keys that cannot be mangled, and can be quite heavy size-wise.
  // In the global build we know `Vue` is available globally so we can avoid
  // the wildcard object.
  const render = (__GLOBAL__
    ? new Function(code)()
    : new Function('Vue', code)(runtimeDom)) as RenderFunction

  // mark the function as runtime compiled
  ;(render as InternalRenderFunction)._rc = true

  return (compileCache[key] = render)
}

registerRuntimeCompiler(compileToFunction)

export { compileToFunction as compile }
export * from '@vue/runtime-dom'
