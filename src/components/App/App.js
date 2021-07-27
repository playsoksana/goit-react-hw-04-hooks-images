import '../../index.css';
import React, { PureComponent } from 'react';

import { css } from '@emotion/react';
import BeatLoader from 'react-spinners/BeatLoader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery';
import Button from '../Button/Button';
import api from '../helpers/galleryApi';
import Modal from '../Modal';
import Error from '../Error';

class App extends PureComponent {
  state = {
    searchSubject: '',
    collectionImages: [],
    page: 1,
    showModal: false,
    imgForModal: {
      url: null,
      alt: null,
    },
    status: 'idle',
    buttonVisible: false,
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { page, searchSubject } = this.state;
    if (page !== prevState.page) {
      this.setState({
        status: 'loading',
      });
      try {
        (async () => {
          const resolveParse = await api(searchSubject, page);
          this.setState(prevState => ({
            collectionImages: [
              ...prevState.collectionImages,
              ...resolveParse.hits,
            ],
            status: 'resolved',
            buttonVisible:
              Math.ceil(resolveParse.total / 12) === page ? false : true,
          }));
        })();
      } catch (error) {
        this.setState({
          status: 'error',
          collectionImages: [],
          buttonVisible: false,
        });
      }
    }
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
   
  };

  onSubmitForm = async ev => {
    const { target } = ev;

    const {
      search: { value },
    } = target;
    const { searchSubject, page } = this.state;

    ev.preventDefault();
    if (searchSubject.toLowerCase() === value.toLowerCase()) {
      return;
    }

    if (!value.trim().length) {
      toast.error('Your string consists of only spaces, enter a valid string!');
      return;
    }

    this.setState({
      page: 1,
      searchSubject: value,
      status: 'loading',
    });

    try {
      const { hits, total } = await api(value, page);

      if (total > 0) {
        this.setState({
          collectionImages: [...hits],
          status: 'resolved',
          buttonVisible: total > 13,
        });
        return;
      }
      Promise.reject(new Error('Nothing found'));
    } catch (error) {
      this.setState({
        status: 'error',
        collectionImages: [],
        buttonVisible: false,
      });
    }
  };

  increment = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      buttonVisible: false,
    }));
  };

  openModal = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      return;
    }

    this.setState({
      showModal: true,
      imgForModal: {
        url: target.getAttribute('data'),
        alt: target.getAttribute('alt'),
      },
    });
  };

  closeModal = () => {
   
      this.setState({
        showModal: false,
      });
    
  };

  render() {
    const override = css`
      display: block;
      margin-left: 50%;
      border-color: blue;
    `;

    const { onSubmitForm, openModal, closeModal, increment } = this;
    const {
      collectionImages,
      showModal,
      imgForModal: { url, alt },
      status,
      buttonVisible,
    } = this.state;

    return (
      <div>
        <Searchbar onSubmit={onSubmitForm} />
        
        <ImageGallery
          openModal={openModal}
          collectionImages={collectionImages}
        />
        {buttonVisible && <Button imageUpload={increment} text="Load more" />}

     
        {status === 'loading' && (
          <BeatLoader loading={true} css={override} size={40} />
        )}
        {showModal && (
          <Modal closeModal={closeModal}>
            <img src={url} alt={alt}></img>
          </Modal>
        )}
        {status === 'error' && <Error />}
        <ToastContainer />
      </div>
    );
  }
}

export default App;
