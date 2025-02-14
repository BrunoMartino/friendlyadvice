import { ModalFlutter } from '../../../../../../components/ComponentesFlutter/FlutterModal/ModalFlutter';
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { TextArea } from '../../../../../../components/InputTextArea/stylesInputTextArea';
import { UploaderImagesFlutter } from '../../../../../../components/ComponentesFlutter/UploaderImages/index-upload-flutter';
import { FaSignature } from 'react-icons/fa';
import { ModalFlutterCenter } from '../../../../../../components/ComponentesFlutter/FlutterModalCenter/index-modal-flutter-center';
import SignatureCanvas from '../../../../../../components/CanvasDrawing/index-canvas';
import api from '../../../../../../services/api';
import { formatDateForOS, getTokenDashboard } from '../../../../../../utils/fn';
import { InputPadrao } from '../../../../../../components/ComponentesFlutter/InputPadrao/input-padrao-novo';
import InputTimeDate from '../../../../../../components/InputTimeDate/indexInputTimeDate';
import { PreviewContainerImagem } from '../../../../../../components/ComponentesFlutter/shared-styles';
import { DateTime } from 'luxon';

type tFile = File | null;
type tFiles = File[] | null;
interface IFormikRef {
  values: Record<string, any>;
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleBlur: () => void;
  submitForm: () => void;
  setFieldValue: (field: string, value: any) => void;
}
interface ModalFlutterAtendimentoProps {
  isOpen: boolean;
  onClose: () => void;
  dados: Record<string, any>;
  setStateChange?: () => void;
}

interface IImages {
  ordemDeServico: {
    OSAI_IMAGEM: string;
    ID_ORDEMSERVICOATENDIMENTOSIMAGEM: string;
  }[];
}

const makeDate = (value: string | null) => {
  if (!value) return null;
  const simpleDate = new Date();
  const [hour, minutes] = value.split(':');
  simpleDate.setHours(Number(hour), Number(minutes), 0, 0);
  return DateTime.fromJSDate(simpleDate).toISO();
};

export const ModalFlutterAtendimento: React.FC<
  ModalFlutterAtendimentoProps
> = ({ isOpen, onClose, dados, setStateChange }) => {
  const formikRef = useRef<IFormikRef>(null);

  const [modalAssinatura, setModalAssinatura] = useState(false);
  const [getAssinatura, setAssinaturaImage] = React.useState('');
  const [getAssinaturaBlob, setAssinaturaImageBlob] =
    React.useState<tFile>(null);

  const [getImagem, setImagem] = React.useState<tFiles>(null);

  const [formData, setFormData] = useState({
    hInicial: formikRef.current?.values.hInicial,
    hFinal: formikRef.current?.values.hFinal,
    descricao: formikRef.current?.values.descricao,
    selectItemOnModal: dados.itens[0].id,
  });

  const [showAllImages, setShowAllImages] = React.useState<IImages>({
    ordemDeServico: [],
  });

  const removeImageFromDatabase = useCallback(async (id) => {
    try {
      await api.delete(`/api/v1/ordemdeservico/deletar/imagem/${id}`);
      fillArrayUrlImagesOnEdit();
    } catch (error) {
      console.error('Error removing image:', error);
    }
  }, []);

  const fillArrayUrlImagesOnEdit = useCallback(async () => {
    const { data } = await api.get(
      `/api/v1/ordemdeservico/servico/imagens/${dados.dataToEdit.idOrdemServicoAtendimento}`,
    );

    setShowAllImages(data);
  }, []);

  const fillInputToUpdate = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      hInicial: formatDateForOS(dados.dataToEdit.hora_inicial),
      hFinal: formatDateForOS(dados.dataToEdit.hora_final),
      descricao: dados.dataToEdit.descricao,
    }));
    formikRef.current?.setFieldValue('hInicial', dados.dataToEdit.hInicial);
    formikRef.current?.setFieldValue('hFinal', dados.dataToEdit.hFinal);
    formikRef.current?.setFieldValue('descricao', dados.dataToEdit.descricao);
  }, [dados]);

  useEffect(() => {
    if ('dataToEdit' in dados && dados.dataToEdit) {
      fillInputToUpdate();
      fillArrayUrlImagesOnEdit();
      setAssinaturaImage(dados.dataToEdit.assinatura ?? '');
    }
  }, []);

  if (!isOpen && dados.itens.length > 0) return null;

  async function submit(values: Record<string, any>) {
    api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;

    const formDataImagens = new FormData();
    const formDataAssinatura = new FormData();

    if (getImagem && getImagem.length > 0) {
      getImagem.forEach((file) => {
        formDataImagens.append('images', file);
      });
    }

    if (getAssinaturaBlob) {
      formDataAssinatura.append('assinatura', getAssinaturaBlob);
    }

    try {
      let imagensResponse: any;
      let assinaturaResponse: any;

      if (formDataImagens.has('images')) {
        imagensResponse = await api.post(
          '/api/v1/ordemdeservico/uploadImagens',
          formDataImagens,
        );
      }

      if (formDataAssinatura.has('assinatura')) {
        assinaturaResponse = await api.post(
          '/api/v1/ordemdeservico/uploadAssinatura',
          formDataAssinatura,
        );
      }

      if ('dataToEdit' in dados && dados.dataToEdit) {
        const dataInicial = values.hInicial ?? dados.dataToEdit.hora_inicial;
        const dataFinal = values.hFinal ?? dados.dataToEdit.hora_final;

        await api
          .put(
            `/api/v1/ordemdeservico/atualizar/${dados.dataToEdit.idOrdemServicoAtendimento}`,
            {
              dataInicial: makeDate(dataInicial),
              dataFinal: makeDate(dataFinal),
              servicoExecutado: values.descricao ?? dados.dataToEdit.descricao,
              idOrdemServicoAtendimento:
                dados.dataToEdit.idOrdemServicoAtendimento ?? null,
              idOrdemServicoItens:
                values.selectItemOnModal ?? dados.itens[0].id,
              idOrdemServico: dados.idOrdemServico,
              assinatura: assinaturaResponse
                ? assinaturaResponse.data.upload.url
                : null,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          )
          .then(async (response) => {
            if (response) {
              if (imagensResponse) {
                for await (let imagemUrl of imagensResponse.data.upload) {
                  await api.post('/api/v1/ordemdeservico/adicionar/imagem', {
                    idOrdemServicoAtendimento:
                      response.data.ordemDeServico.ID_ORDEMSERVICOATENDIMENTOS,
                    imagem: imagemUrl.url,
                  });
                }
              }
            }
            setStateChange && setStateChange() && onClose();
          });
        return;
      }

      await api
        .post(
          '/api/v1/ordemdeservico/adicionar/servico',
          {
            dataInicial: makeDate(values.hInicial),
            dataFinal: makeDate(values.hFinal),
            servicoExecutado: values.descricao,

            idOrdemServicoItens: values.selectItemOnModal,
            idOrdemServico: dados.idOrdemServico,

            assinatura: assinaturaResponse
              ? assinaturaResponse.data.upload.url
              : null,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .then(async (response) => {
          if (response) {
            if (imagensResponse) {
              for await (let imagemUrl of imagensResponse.data.upload) {
                await api.post('/api/v1/ordemdeservico/adicionar/imagem', {
                  idOrdemServicoAtendimento:
                    response.data.ordemDeServico.ID_ORDEMSERVICOATENDIMENTOS,
                  imagem: imagemUrl.url,
                });
              }
            }
          }
          setStateChange && setStateChange() && onClose();
        });
    } catch (error) {
      console.error('Error uploading data:', error);
      onClose();
    }
  }

  return (
    <ModalFlutter.Overlay onClick={(e) => onClose()}>
      <ModalFlutter.Container onClick={(e) => e.stopPropagation()}>
        <ModalFlutter.FormContent
          ref={formikRef}
          handleSumbit={submit}
          handleClose={() => {
            onClose();
          }}
          initialValuesFormik={formData}
        >
          <h3>Descrição do atendimento</h3>
          <ModalFlutter.InputInLine>
            <div>
              <InputPadrao.PadraoSelect
                exposeSelected={(e) => {
                  formikRef.current?.setFieldValue(
                    'selectItemOnModal',
                    dados.itens[0].id,
                  );
                }}
                data={dados.itens}
                idInput="selectItemOnModal"
                valoresIniciais={dados.itens[0]}
              />
              <label htmlFor="selectItemOnModal">Selecione o Item</label>
            </div>
          </ModalFlutter.InputInLine>
          <ModalFlutter.InputInLine>
            <div>
              <InputTimeDate
                placeholder="Hora inicial"
                mask={'99:99'}
                id="hInicial"
                name="hInicial"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  formikRef.current?.handleChange(e);
                  setFormData((prev) => ({
                    ...prev,
                    hInicial: e.target.value,
                  }));
                }}
                value={formData.hInicial}
                inputMode={'numeric'}
              />
              <label htmlFor="hInicial">Hora Inicial</label>
            </div>
            <div>
              <InputTimeDate
                placeholder="Hora final"
                mask={'99:99'}
                id="hFinal"
                name="hFinal"
                onChange={(e: any) => {
                  formikRef.current?.handleChange(e);
                  setFormData((prev) => ({
                    ...prev,
                    hFinal: e.target.value,
                  }));
                }}
                onBlur={(e: any) => {
                  formikRef.current?.setFieldValue('hFinal', e.target.value);
                }}
                value={formData.hFinal}
                inputMode={'numeric'}
              />
              <label htmlFor="hFinal">Hora Final</label>
            </div>
          </ModalFlutter.InputInLine>

          <ModalFlutter.InputInLine>
            <TextArea
              id="descricao"
              name="descricao"
              value={formData.descricao}
              onChange={(e) => {
                formikRef.current?.handleChange(e);
                setFormData((prev) => ({
                  ...prev,
                  descricao: e.target.value,
                }));
              }}
              onBlur={(e) => {
                formikRef.current?.setFieldValue('descricao', e.target.value);
              }}
              placeholder="Insira uma descrição para o Atendimento"
            />
          </ModalFlutter.InputInLine>
          <ModalFlutter.InputInLine>
            <UploaderImagesFlutter.InputSelectImageMulti
              text="Inserir Imagem"
              getImage={setImagem}
            />
          </ModalFlutter.InputInLine>
          <PreviewContainerImagem>
            {showAllImages.ordemDeServico.length >= 1 &&
              showAllImages.ordemDeServico.map((a, index) => {
                return (
                  <React.Fragment key={a.ID_ORDEMSERVICOATENDIMENTOSIMAGEM}>
                    <UploaderImagesFlutter.ImageHandler
                      configDisplay={{
                        blob: a.OSAI_IMAGEM,
                        convertedBlob: true,
                      }}
                      index={index + a.OSAI_IMAGEM}
                      removeImage={() => {}}
                      onRemove={() => {
                        removeImageFromDatabase(
                          a.ID_ORDEMSERVICOATENDIMENTOSIMAGEM,
                        );
                      }}
                    />
                  </React.Fragment>
                );
              })}
          </PreviewContainerImagem>

          <ModalFlutter.InputInLine>
            <UploaderImagesFlutter.InputSelectImageUnique
              text="Inserir Assinatura"
              onClick={(e) => {
                setModalAssinatura(true);
                e.stopPropagation();
                e.preventDefault();
              }}
              icon={<FaSignature />}
            />
          </ModalFlutter.InputInLine>
          {getAssinatura.length > 1 && (
            <UploaderImagesFlutter.ImageHandler
              configDisplay={{ blob: getAssinatura, convertedBlob: true }}
              index={0}
              removeImage={() => setAssinaturaImage('')}
            />
          )}
        </ModalFlutter.FormContent>
        {modalAssinatura && (
          <ModalFlutterCenter.Overlay onClick={() => setModalAssinatura(false)}>
            <ModalFlutterCenter.ModalContainerCenter
              minHeight={28}
              minWidth={20}
              maxWidth={45}
              maxHeight={35}
              onClick={(e) => e.stopPropagation()}
            >
              <h3>Assine abaixo:</h3>
              <SignatureCanvas
                height={250}
                getImage={setAssinaturaImage}
                getImageBlob={setAssinaturaImageBlob}
                handleOpenOrClose={() => setModalAssinatura(false)}
              />
            </ModalFlutterCenter.ModalContainerCenter>
          </ModalFlutterCenter.Overlay>
        )}
      </ModalFlutter.Container>
    </ModalFlutter.Overlay>
  );
};
