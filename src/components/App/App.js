import '../../index.css';
import { useState, useEffect } from 'react';

import { css } from '@emotion/react';
import BeatLoader from 'react-spinners/BeatLoader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery';
import Button from '../Button/Button';
import api from '../../helpers/galleryApi';
import Modal from '../Modal';
import Error from '../Error';

const App = () => {
  const [state, setState] = useState({
    searchSubject: '',
    collectionImages: [],
    page: 0,
    showModal: false,
    imgForModal: {
      url: null,
      alt: null,
    },

    status: 'idle',
    buttonVisible: false,
  });

  useEffect(() => {
    if (state.page === 0) {
      return;
    }

    setState(s => ({
      ...s,
      status: 'loading',
    }));

    (async () => {
      try {
        const resolveParse = await api(state.searchSubject, state.page);

        if (resolveParse.total > 0) {
          setState(s => ({
            ...s,
            collectionImages: [...s.collectionImages, ...resolveParse.hits],
            buttonVisible:
              Math.ceil(resolveParse.total / 12) === state.page ? false : true,
            status: 'resolved',
          }));
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
          return;
        }
        throw new Error('Nothing found');
       // Promise.reject(new Error('Nothing found'));
      } catch (error) {
        setState(s => ({
          ...s,
          status: 'error',
          buttonVisible: false,
        }));
      }
    })();
  }, [state.page, state.searchSubject]);

  async function onSubmitForm(ev) {
    ev.preventDefault();
    const {
      target: {
        search: { value },
      },
    } = ev;

    if (state.searchSubject.toLowerCase() === value.toLowerCase()) {
      return;
    }

    if (!value.trim().length) {
      toast.error('Your string consists of only spaces, enter a valid string!');

      return;
    }
    setState(s => ({
      ...s,
      page: 1,
      searchSubject: value,
      collectionImages: [],
    }));
  }

  function increment() {
    setState(s => ({
      ...s,
      page: s.page + 1,
      buttonVisible: false,
    }));
  }

  function openModal({ target, currentTarget }) {
    if (target === currentTarget) {
      return;
    }

    setState(s => ({
      ...s,
      imgForModal: {
        url: target.getAttribute('data'),
        alt: target.getAttribute('alt'),
      },
      showModal: true,
    }));
  }

  function closeModal() {
    setState(s => ({ ...s, showModal: false }));
  }

  const override = css`
    display: block;
    margin-left: 50%;
    border-color: blue;
  `;

  return (
    <div>
      <Searchbar onSubmit={onSubmitForm} />

      <ImageGallery
        openModal={openModal}
        collectionImages={state.collectionImages}
      />

      {state.buttonVisible && (
        <Button imageUpload={increment} text="Load more" />
      )}

      {state.status === 'loading' && (
        <BeatLoader loading={true} css={override} size={40} />
      )}

      {state.showModal && (
        <Modal closeModal={closeModal}>
          <img src={state.imgForModal.url} alt={state.imgForModal.alt}></img>
        </Modal>
      )}
      {state.status === 'error' && <Error />}
      <ToastContainer />
    </div>
  );
};


export default App;
