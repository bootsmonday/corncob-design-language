import { computed, defineComponent, h } from 'vue';

function buildButtonClasses({ variant = 'primary', size = 'md', className = '' } = {}) {
  const classes = ['corn-button'];

  if (variant && variant !== 'primary') {
    classes.push(`corn-button--${variant}`);
  }

  if (size && size !== 'md') {
    classes.push(`corn-button--${size}`);
  }

  if (className) {
    classes.push(className);
  }

  return classes.join(' ');
}

export const CcButton = defineComponent({
  name: 'CcButton',
  props: {
    variant: {
      type: String,
      default: 'primary',
    },
    size: {
      type: String,
      default: 'md',
    },
    className: {
      type: String,
      default: '',
    },
  },
  setup(props, { slots, attrs }) {
    const classes = computed(() => {
      return buildButtonClasses({
        variant: props.variant,
        size: props.size,
        className: props.className,
      });
    });

    return () => {
      return h(
        'button',
        {
          ...attrs,
          class: classes.value,
        },
        slots.default ? slots.default() : []
      );
    };
  },
});

export { buildButtonClasses };
