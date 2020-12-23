import React from 'react';
import {mountWithApp} from 'test-utilities';
import {Tokens} from 'utilities/theme';

import {Collapsible} from '../Collapsible';

describe('<Collapsible />', () => {
  it('does not render its children and indicates hidden with aria-hidden', () => {
    const collapsible = mountWithApp(
      <Collapsible id="test-collapsible" open={false}>
        content
      </Collapsible>,
    );

    expect(collapsible).toContainReactComponent('div', {'aria-hidden': true});
  });

  it('renders its children and does not render aria-hidden when open', () => {
    const collapsible = mountWithApp(
      <Collapsible id="test-collapsible" open>
        content
      </Collapsible>,
    );

    expect(collapsible).toContainReactComponent('div', {'aria-hidden': false});
    expect(collapsible).toContainReactText('content');
  });

  it('renders its children when expandOnPrint is true and open is false', () => {
    const collapsible = mountWithApp(
      <Collapsible id="test-collapsible" open={false} expandOnPrint>
        content
      </Collapsible>,
    );

    expect(collapsible).toContainReactText('content');
  });

  it('renders its children when expandOnPrint is true and open is true', () => {
    const collapsible = mountWithApp(
      <Collapsible id="test-collapsible" open expandOnPrint>
        content
      </Collapsible>,
    );

    expect(collapsible).toContainReactText('content');
  });

  describe('Transition', () => {
    it('passes a duration property', () => {
      const duration = Tokens.duration150;
      const collapsible = mountWithApp(
        <Collapsible id="test-collapsible" open transition={{duration}} />,
      );

      expect(collapsible).toContainReactComponent('div', {
        style: {
          height: 'auto',
          overflow: 'visible',
          transitionTimingFunction: 'undefined',
          transitionDuration: duration,
        },
      });
    });

    it('passes a timingFunction property', () => {
      const timingFunction = Tokens.ease;
      const collapsible = mountWithApp(
        <Collapsible
          id="test-collapsible"
          open
          transition={{timingFunction}}
        />,
      );

      expect(collapsible).toContainReactComponent('div', {
        style: {
          height: 'auto',
          overflow: 'visible',
          transitionTimingFunction: timingFunction,
          transitionDuration: 'undefined',
        },
      });
    });
  });
});
