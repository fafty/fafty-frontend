import { Modal } from '@fafty-frontend/shared/modals';
import FormCollection from '../../forms/collection/main';
import { FormCollectionContextProvider } from '../../forms/collection/provider';
import { useEffect, useMemo, useState } from 'react';
import {
  api,
  useAsync,
  putCollection,
  getCollection,
  GetCollectionResponseProps,
  PutCollectionParamsProps,
  GetCollectionParamsProps,
} from '@fafty-frontend/shared/api';
import { useNotifications } from '@fafty-frontend/notifications';

import { FormProps } from '../../forms/collection/types';

type Props = {
  title: string;
  slug?: string;
  onClose: () => void;
  isOpened: boolean;
};

const FormCollectionModal = ({ title, isOpened, onClose, slug }: Props) => {
  const {
    data: preloadedCollection,
    call: callPreloadCollection,
    isSuccess,
  } = useAsync<GetCollectionResponseProps, GetCollectionParamsProps>({
    callback: getCollection,
  });

  const { call: putCollectionData } = useAsync<
    GetCollectionResponseProps,
    PutCollectionParamsProps
  >({
    callback: (params?: PutCollectionParamsProps) => putCollection(params),
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

    if (drafted && !data.cover?.id) {
      setDrafted(false);
      onClose();
      return;
    }

    setSubmiting(true);

    try {
      if (slug) {
        await putCollectionData({ slug: slug, collection: data });
      } else {
        await api.post('/collection', { collection: data });
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
          title: `Collection "${data.name}" saved as draft.`,
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
      callPreloadCollection({ slug });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <FormCollectionContextProvider
            defaultData={preloadedCollection?.record}
            onChangeDismiss={onChangeDismiss}
            rawDataCallback={drafted}
            onRawDataCallback={(data) => onSubmit(data)}
            onFinished={() => setFinished(true)}
          >
            <FormCollection
              defaultCover={preloadedCollection?.record?.cover}
              onSubmit={onSubmit}
              submiting={submiting}
            />
          </FormCollectionContextProvider>
        )}
      </div>
    </Modal>
  );
};

export default FormCollectionModal;
