import { Modal } from '@fafty-frontend/shared/modals';
import FormAsset from '../../forms/asset/main';
import { FormAssetContextProvider } from '../../forms/asset/provider';
import { useEffect, useState } from 'react';
import {
  api,
  useAsync,
  putAsset,
  getAsset,
  AssetProps,
  AssetResponseProps,
  AssetPutParams,
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
    data: preloadedAsset,
    call: callPreloadAsset,
    isSuccess,
  } = useAsync<AssetResponseProps, string>({
    callback: getAsset,
  });

  const { call: putAssetData } = useAsync<AssetResponseProps, AssetPutParams>({
    callback: (params?: AssetPutParams) => putAsset(params),
  });

<<<<<<< HEAD
  const defaultData = { ...preloadedAsset?.record };

=======
>>>>>>> 95e24fde2c6bb63885d19189b361e44c8c69d39f
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

<<<<<<< HEAD
    if (drafted && !data.media) {
=======
    if (drafted && !data.asset?.id) {
>>>>>>> 95e24fde2c6bb63885d19189b361e44c8c69d39f
      setDrafted(false);
      onClose();
      return;
    }

    setSubmiting(true);

    try {
      if (slug) {
        await putAssetData({ slug: slug, asset: data });
      } else {
        await api.post('/asset', { asset: data });
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
      callPreloadAsset(slug);
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
<<<<<<< HEAD
            defaultData={defaultData as AssetProps}
=======
            defaultData={preloadedNft?.record}
>>>>>>> 95e24fde2c6bb63885d19189b361e44c8c69d39f
            onChangeDismiss={onChangeDismiss}
            rawDataCallback={drafted}
            onRawDataCallback={(data) => onSubmit(data)}
            onFinished={() => setFinished(true)}
          >
            <FormAsset
<<<<<<< HEAD
              defaultAsset={defaultData?.media}
=======
              defaultAsset={preloadedNft?.record?.asset}
>>>>>>> 95e24fde2c6bb63885d19189b361e44c8c69d39f
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
