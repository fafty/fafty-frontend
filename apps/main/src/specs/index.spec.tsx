/**
 * @jest-environment ./src/specs/custom-environment-with-textencoder
 */
import React, { useContext } from 'react'
import { getByRole, render } from '@testing-library/react'
import Index from '../pages/index'
import {
  AssetFormStepDataType,
  CommentsModerationType,
  CommentsOrderType
} from '@fafty/shared/types'
import Context from '../components/forms/asset/context'
import FormAssetContextProvider from '../../src/components/forms/asset/provider'

import { mockIntersectionObserver } from 'jsdom-testing-mocks'

mockIntersectionObserver()

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn()
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null)
    }
  }
}))

describe('Index', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Index />)
    expect(baseElement).toBeTruthy()
  })
})

describe('Context assets', () => {
  const TestComponent = () => {
    const { stepData: data } = useContext(Context)

    return <span role="state">{JSON.stringify(data)}</span>
  }

  test('provide defaultData', () => {
    const assetContextDefaultData = {
      allow_ratings: false,
      available_supply_units: 0,
      blockchain: 'dfinity',
      collection: null,
      comments_moderation: 'allow_all' as CommentsModerationType,
      comments_order: 'newest' as CommentsOrderType,
      created_at: '2022-11-17T16:57:38Z',
      deleted_at: null,
      description: null,
      collection_token: '',
      media: {
        dominant_color: null,
        file_id: '8087e1b4a885f18f6e44a22583991c6e.png',
        filename: 'unnamed.png',
        height: null,
        mime_type: 'image/png',
        size: 23463,
        src: 'https://fafty-assets.s3.amazonaws.com/cache/8087e1b4a885f18f6e44a22583991c6e.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2KFQUOXC7Z2EDLGL%2F20221230%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20221230T064655Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=85168e3c7d1405e65cef24d1d5dcad1ecf9edd6a53dea4b1fc0389ae8f5c85e2',
        storage: 'cache',
        type: 'image',
        width: null
      },
      name: 'unnamed',
      pool: 'draft',
      price: 12,
      price_history: {},
      properties: {},
      restrictions: 'none',
      sensitive_content: false,
      slug: 'unnamed',
      supply_units: 1,
      ticker: 'ICP',
      token: 'urv5vk7c',
      updated_at: '2022-11-17T16:57:38Z',
      verified_at: null,
      visibility: 'draft',
      published_at: null,
      tags: []
    }

    const mockDefaultStepData: AssetFormStepDataType = {
      media: {
        id: assetContextDefaultData?.media?.file_id || '',
        storage: assetContextDefaultData?.media?.storage || '',
        src: assetContextDefaultData?.media?.src || '',
        metadata: {
          size: assetContextDefaultData?.media?.size || 0,
          filename: assetContextDefaultData?.media?.filename || '',
          mime_type: assetContextDefaultData?.media?.mime_type || ''
        }
      },
      step1: {
        state: {
          name: assetContextDefaultData?.name || '',
          description:
            assetContextDefaultData?.description &&
            Object.keys(assetContextDefaultData?.description).length
              ? assetContextDefaultData?.description
              : '',
          unlockable_content: null,
          sensitive_content: !!assetContextDefaultData?.sensitive_content
        },
        solved: !!assetContextDefaultData?.description,
        error: false
      },
      step2: {
        state: {
          blockchain: assetContextDefaultData?.blockchain || 'dfinity',
          supply_units: assetContextDefaultData?.available_supply_units || 1,
          collection_token: assetContextDefaultData?.collection_token || ''
        },
        solved:
          !!assetContextDefaultData?.available_supply_units &&
          !!assetContextDefaultData?.collection_token &&
          !!assetContextDefaultData?.blockchain,
        error: false
      },
      step3: {
        state: {
          allow_ratings: !!assetContextDefaultData?.allow_ratings,
          comments_moderation:
            assetContextDefaultData?.comments_moderation ||
            ('' as CommentsModerationType),
          comments_order:
            assetContextDefaultData?.comments_order ||
            ('newest' as CommentsOrderType),
          tags: assetContextDefaultData?.tags || []
        },
        solved:
          !!assetContextDefaultData?.tags?.length &&
          !!assetContextDefaultData?.comments_moderation &&
          !!assetContextDefaultData?.comments_order,
        error: false
      },
      step4: {
        state: {
          is_checked: !!assetContextDefaultData
        },
        solved: !!assetContextDefaultData,
        error: false
      }
    }

    const { getByRole } = render(
      <FormAssetContextProvider
        onFinished={jest.fn}
        onChangeDismiss={jest.fn}
        onRawDataCallback={jest.fn}
        rawDataCallback={false}
        defaultData={assetContextDefaultData}
      >
        <TestComponent />
      </FormAssetContextProvider>
    )

    expect(getByRole('state').textContent).toEqual(
      JSON.stringify(mockDefaultStepData)
    )
  })
})
