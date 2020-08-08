import { mount } from '@vue/test-utils';

import TitleSection from '@/components/TitleSection';

describe('TitleSection', () => {
  it('displays title and subtitle', () => {
    const wrapper = mount(TitleSection, {
      propsData: {
        title: 'Test title',
        subtitle: 'Test subtitle',
      },
    });

    expect(wrapper.text()).toContain('Test title');
    expect(wrapper.text()).toContain('Test subtitle');
  });

  it('displays only title', () => {
    const wrapper = mount(TitleSection, {
      propsData: {
        title: 'Test title',
        subtitle: '',
      },
    });

    expect(wrapper.text()).toContain('Test title');
  });

  it('displays only subtitle', () => {
    const wrapper = mount(TitleSection, {
      propsData: {
        title: '',
        subtitle: 'Test subtitle',
      },
    });

    expect(wrapper.text()).toContain('Test subtitle');
  });
});
