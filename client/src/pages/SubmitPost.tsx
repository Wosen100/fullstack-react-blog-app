import React, {
  FormEvent,
  useState,
  useEffect,
  ChangeEvent,
} from 'react';
import styled from 'styled-components';
import { nanoid } from 'nanoid';
import { shallowEqual } from 'react-redux';
import { RootState } from '../store';
import { addPost } from '../store/postSlice';
import { getCommunities } from '../store/communitySlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import funcs from '../utils/Functions';

const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  h2 {
    text-align: center;
  }
`;

const FormWrapper = styled.div`
  width: 80vw;
  height: 80vh;
  margin: 0 auto;
  padding: 2vw;
  label {
    display: flex;
    flex-direction: column;
    min-width: 800px;
    #theBody {
      height: 600px;
    }
  }
  button {
    width: 100%;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 5px auto;
`;

type CommunityProps = {
  uniqueName: string;
  displayName: string;
};

function SubmitPost() {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [userName, setUserName] = useState('Anon');
  const [slugifiedName, setSlugifiedName] = useState('');
  const [community, setCommunity] = useState('');
  const [sendDispatch, setSendDispatch] = useState(false);
  const [formObj, setFormObj] = useState({
    theTitle: '',
    theBody: '',
    theCommunity: '',
  });
  const { theTitle, theBody, theCommunity } = formObj;
  const { community: comm } = useAppSelector(
    (state: RootState) => state.community,
    shallowEqual,
  );

  useEffect(() => {
    dispatch(getCommunities());
  }, [dispatch]);

  const handleCommunity = (e: ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormObj({ ...formObj, [id]: value });
  };

  useEffect(() => {
    if (sendDispatch) {
      const postObj = {
        title,
        body,
        community,
        userName,
        slugifiedName,
      };
      dispatch(addPost(postObj));
      setTitle('');
      setBody('');
      setCommunity('');
      setSlugifiedName('');
      setSendDispatch(false);
      setFormObj({ theTitle: '', theBody: '', theCommunity: '' });
    }
  }, [
    sendDispatch,
    dispatch,
    title,
    body,
    community,
    userName,
    slugifiedName,
  ]);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const sName = funcs.slugify(`${theTitle}`);
    setTitle(`${theTitle}`);
    setBody(`${theBody}`);
    if (theCommunity) {
      setCommunity(`${theCommunity}`);
    } else {
      setCommunity(`${comm[0].displayName}`);
    }
    setUserName(userName); // may need to change this later when user auth is good
    setSlugifiedName(sName);
    setSendDispatch(true);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormObj({ ...formObj, [id]: value });
  };

  const handleTextAreaChange = (
    e: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormObj({ ...formObj, [id]: value });
  };

  return (
    <PageWrapper>
      <h2>Add Post</h2>
      <FormWrapper>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="theTitle">
            Title:
            <input
              id="theTitle"
              placeholder="(Title)"
              type="string"
              value={theTitle}
              onChange={handleInputChange}
            />
          </label>
          <label htmlFor="theBody">
            Body:
            <textarea
              id="theBody"
              placeholder="(Description)"
              value={theBody}
              onChange={handleTextAreaChange}
            />
          </label>
          <label htmlFor="theCommunity">
            Community:
            <select
              id="theCommunity"
              onChange={handleCommunity}
              value={theCommunity}
            >
              {Object.values(comm).map((com: CommunityProps) => {
                return (
                  <option key={nanoid()}>{com.displayName}</option>
                );
              })}
            </select>
          </label>
          <ButtonWrapper>
            <button type="submit">Add Post</button>
          </ButtonWrapper>
        </form>
      </FormWrapper>
    </PageWrapper>
  );
}

export default SubmitPost;
