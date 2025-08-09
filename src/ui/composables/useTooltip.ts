import { ref, Ref } from 'vue'

export interface TooltipData {
  visible: boolean
  x: number
  y: number
  content: any
}

/**
 * A reusable Vue composable for managing tooltip behavior and positioning.
 *
 * Provides reactive state and utility functions to show, hide, and
 * position tooltips relative to an HTML element based on mouse events.
 *
 * ### Example
 * ```ts
 * const {
 *   tooltipVisible,
 *   tooltipX,
 *   tooltipY,
 *   tooltipContent,
 *   handleMouseEnter,
 *   handleMouseLeave
 * } = useTooltip()
 *
 * <div @mouseenter="handleMouseEnter($event, { name: 'Example' })"
 *      @mouseleave="handleMouseLeave">
 *   Hover me!
 * </div>
 * ```
 *
 * @returns {object} Reactive states and control functions:
 * - `tooltipVisible` {Ref<boolean>} Whether the tooltip is visible.
 * - `tooltipX` {Ref<number>} Tooltip’s X position in pixels.
 * - `tooltipY` {Ref<number>} Tooltip’s Y position in pixels.
 * - `tooltipContent` {Ref<any>} The tooltip’s content.
 * - `showTooltip(event, content, options?)` Shows the tooltip manually.
 * - `hideTooltip()` Hides the tooltip.
 * - `handleMouseEnter(event, content, options?)` Event handler to show the tooltip.
 * - `handleMouseLeave()` Event handler to hide the tooltip.
 *
 * @param {MouseEvent} event The mouse event triggering the tooltip.
 * @param {any} content The data or content to display in the tooltip.
 * @param {object} [options] Optional positioning and size parameters.
 * @param {number} [options.offsetX=0] Additional horizontal offset in pixels.
 * @param {number} [options.offsetY=0] Additional vertical offset in pixels.
 * @param {number} [options.width=250] Tooltip width in pixels.
 * @param {'above'|'below'|'left'|'right'} [options.position='above'] Tooltip placement relative to the target.
 */
export function useTooltip() {
  const tooltipVisible = ref(false)
  const tooltipX = ref(0)
  const tooltipY = ref(0)
  const tooltipContent = ref<any>(null)

  function showTooltip(event: MouseEvent, content: any, options?: {
    offsetX?: number
    offsetY?: number
    width?: number
    position?: 'above' | 'below' | 'left' | 'right'
  }) {
    const rect = (event.target as HTMLElement).getBoundingClientRect()
    const tooltipWidth = options?.width || 250
    const offsetX = options?.offsetX || 0
    const offsetY = options?.offsetY || 0
    const position = options?.position || 'above'

    tooltipContent.value = content
    tooltipVisible.value = true

    // Posicionar el tooltip según la posición especificada
    switch (position) {
      case 'above':
        tooltipX.value = rect.left + rect.width / 2 - tooltipWidth / 2 + offsetX
        tooltipY.value = rect.top - 150 + offsetY
        break
      case 'below':
        tooltipX.value = rect.left + rect.width / 2 - tooltipWidth / 2 + offsetX
        tooltipY.value = rect.bottom + 10 + offsetY
        break
      case 'left':
        tooltipX.value = rect.left - tooltipWidth - 10 + offsetX
        tooltipY.value = rect.top + rect.height / 2 - 50 + offsetY
        break
      case 'right':
        tooltipX.value = rect.right + 10 + offsetX
        tooltipY.value = rect.top + rect.height / 2 - 50 + offsetY
        break
    }

    // Asegurar que no se salga de la pantalla
    if (tooltipX.value < 10) tooltipX.value = 10
    if (tooltipX.value + tooltipWidth > window.innerWidth - 10) {
      tooltipX.value = window.innerWidth - tooltipWidth - 10
    }
    if (tooltipY.value < 10) {
      if (position === 'above') {
        tooltipY.value = rect.bottom + 10
      } else {
        tooltipY.value = 10
      }
    }
  }

  function hideTooltip() {
    tooltipVisible.value = false
    tooltipContent.value = null
  }

  function handleMouseEnter(event: MouseEvent, content: any, options?: {
    offsetX?: number
    offsetY?: number
    width?: number
    position?: 'above' | 'below' | 'left' | 'right'
  }) {
    showTooltip(event, content, options)
  }

  function handleMouseLeave() {
    hideTooltip()
  }

  return {
    tooltipVisible,
    tooltipX,
    tooltipY,
    tooltipContent,
    showTooltip,
    hideTooltip,
    handleMouseEnter,
    handleMouseLeave
  }
} 