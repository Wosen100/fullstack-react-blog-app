import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';
import styles from 'styled-components';
import { getNews } from '../../services/API';
import generic_news from '../../img/generic_news.jpg';
import funcs from '../../utils/Functions';

const NewsWrapper = styles.div`
  overflow: hidden;
  max-width: 60%;
  height: 20%;
  margin: 0 auto;
  border-radius: 12px;
  background-color: rgba(218, 224, 230, 0.3);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  padding-bottom: 20px;
  h3 {
    padding: 5px;
  }
`;
const CardWrapper = styles.div`
  display: flex;
  top-padding: 25px;
  max-width: 100%;
  max-height: 100%;
  flex-direction: row;
  padding: 0px;
  a {
    max-width: 100%;
    height: 100%;
    margin: 0 auto;
    text-decoration: none;
  }
`;

const LinkWrapper = styles.div<LinkProps>`
  display: flex;
  width: 85%;
  height: 15vh;
  background-image: ${(props) =>
    props.isImg ? `url(${props.img})` : `url(${generic_news})`};
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0 5px;
  p {
    font-size: 0.7rem;
    color: #ffffff;
    text-align: center;
  }
`;

const NewsItemWrapper = styles.div`
  background-color: rgba(0, 0, 0, 0.35);
  display: flex;
  align-self: flex-end;
  border-radius: 25px;
`;

type LinkProps = {
  img: string;
  isImg: boolean;
};

type NewsType = {
  title: string;
  url: string;
  urlToImage: string;
  description: string;
};

function News() {
  const [news, setNews] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const { data } = await getNews();
      setNews(data.articles);
      console.log(data);
    };
    getData();
  }, []);

  return (
    <NewsWrapper>
      <CardWrapper>
        {news.map((newsItem: NewsType, index) => {
          if (index < 5) {
            console.log(newsItem);
            const newsText = funcs.convertText(newsItem.title);
            const bkgdImg = newsItem.urlToImage;
            let isImg = false;
            if (bkgdImg) {
              isImg = true;
            } else {
              isImg = false;
            }
            return (
              <a
                href={newsItem.url}
                target="_blank"
                rel="noreferrer noopener"
              >
                <LinkWrapper
                  key={nanoid()}
                  isImg={isImg}
                  img={bkgdImg}
                >
                  <NewsItemWrapper>
                    <p>{newsText}</p>
                  </NewsItemWrapper>
                </LinkWrapper>
              </a>
            );
          }
          return '';
        })}
      </CardWrapper>
    </NewsWrapper>
  );
}

export default News;
