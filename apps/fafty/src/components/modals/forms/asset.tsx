import { Modal } from '@fafty-frontend/shared/modals';
import FormAsset from '../../forms/asset/main';
import { FormAssetContextProvider } from '../../forms/asset/provider';
import { useEffect, useState } from 'react';
import {
  api,
  useAsync,
  putNft,
  getNft,
  NftProps,
  NftResponseProps,
  NftPutParams,
} from '@fafty-frontend/shared/api';
import { useNotifications } from '@fafty-frontend/notifications';

import { FormProps } from '../../forms/asset/types';

type Props = {
  title: string;
  slug?: string;
  onClose: () => void;
  isOpened: boolean;
};

const FormAssetModal = ({ title, isOpened, onClose, slug }: Props) => {
  const {
    data: preloadedNft,
    call: callPreloadNft,
    isSuccess,
  } = useAsync<NftResponseProps, string>({
    callback: getNft,
  });

  const { call: putNftData } = useAsync<NftResponseProps, NftPutParams>({
    callback: (params?: NftPutParams) => putNft(params),
  });

  const [submiting, setSubmiting] = useState(false);
  const [dismissibleData, setDismissibleData] = useState({
    title: 'Close',
    disabled: false,
  });
  const [finished, setFinished] = useState(false);
  const [drafted, setDrafted] = useState(false);
  const { enqueueNotification } = useNotifications();

  const onSubmit = async (data: FormProps) => {
    if (submiting) {
      return;
    }

    if (drafted && !data.asset?.id) {
      setDrafted(false);
      onClose();
      return;
    }

    setSubmiting(true);

    try {
      if (slug) {
        await putNftData({ slug: slug, nft: data });
      } else {
        await api.post('/nft', { nft: data });
      }
      // eslint-disable-next-line no-useless-catch
    } catch (err) {
      throw err;
    } finally {
      setSubmiting(false);
      if (drafted && !slug) {
        onClose();
        setDrafted(false);
        enqueueNotification({
          title: `Asset "${data.name}" saved as draft.`,
          position: 'bottom-center',
          message: `You can continue to edit it at any time.`,
          options: { dismissible: true },
        });
      }
    }
  };

  const onChangeDismiss = (data: { title: string; disabled: boolean }) => {
    setDismissibleData(data);
  };

  const dismiss = () => {
    if (isOpened && !finished) {
      setDrafted(true);
    } else {
      onClose();
    }

    if (!finished && slug) {
      onClose();
    }
  };

  useEffect(() => {
    if (slug) {
      callPreloadNft(slug);
    }
  }, [slug]);

  return (
    <Modal
      title={title}
      open={isOpened}
      onDismiss={dismiss}
      options={{
        dismissible: {
          active: true,
          title: dismissibleData.title,
          disabled: dismissibleData.disabled,
        },
      }}
      className="w-[calc(95vw_-_5px)]"
    >
      <div className="flex flex-row w-full h-full p-2">
        {((isSuccess && !!slug) || !slug) && (
          <FormAssetContextProvider
            defaultData={preloadedNft?.record}
            onChangeDismiss={onChangeDismiss}
            rawDataCallback={drafted}
            onRawDataCallback={(data) => onSubmit(data)}
            onFinished={() => setFinished(true)}
          >
            <FormAsset
              defaultAsset={preloadedNft?.record?.asset}
              onSubmit={onSubmit}
              submiting={submiting}
            />
          </FormAssetContextProvider>
        )}
      </div>
    </Modal>
  );
};

export default FormAssetModal;
