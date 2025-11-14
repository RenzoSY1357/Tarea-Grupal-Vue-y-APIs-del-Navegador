import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import ScrollToTopButton from '../ScrollToTopButton.vue';

const scrollToSpy = vi.fn();
Object.defineProperty(window, 'scrollTo', { value: scrollToSpy, writable: true });

beforeEach(() => {
  scrollToSpy.mockClear();
  Object.defineProperty(window, 'scrollY', { writable: true, value: 0 });
});

describe('ScrollToTopButton', () => {
  it('1.2.1: should not be visible when scrollY is below the threshold', () => {
    const wrapper = mount(ScrollToTopButton);
    
    expect(wrapper.find('button').exists()).toBe(false);
  });

  it('1.2.2: should become visible when scrollY is above the threshold', async () => {
    const wrapper = mount(ScrollToTopButton);

    Object.defineProperty(window, 'scrollY', { value: 300 });

    window.dispatchEvent(new Event('scroll'));
    await nextTick();

    expect(wrapper.find('button').exists()).toBe(true);
  });

  it('1.2.3: should call window.scrollTo({ top: 0 }) when clicked', async () => {
    const wrapper = mount(ScrollToTopButton);

    Object.defineProperty(window, 'scrollY', { value: 300 });
    window.dispatchEvent(new Event('scroll'));
    await nextTick();

    await wrapper.find('button').trigger('click');

    expect(scrollToSpy).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });
});