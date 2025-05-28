import Head from 'next/head';
import { useEffect } from 'react';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import { getSortedPostsData } from '../lib/posts';
import Date from '../components/date';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  useEffect(() => {
    const elements = document.querySelectorAll('.animate-fade-in');
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('visible');
      }, 300 * index);
    });

    const blogItems = document.querySelectorAll('.blog-item');
    blogItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        item.classList.add('item-hover');
      });
      item.addEventListener('mouseleave', () => {
        item.classList.remove('item-hover');
      });
    });
  }, []);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
        <style jsx global>{`
          .animate-fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.8s ease, transform 0.8s ease;
          }
          
          .animate-fade-in.visible {
            opacity: 1;
            transform: translateY(0);
          }
          
          .blog-item {
            transition: all 0.3s ease;
            border-radius: 8px;
            padding: 10px;
          }
          
          .item-hover {
            background-color: rgba(0, 0, 0, 0.05);
            transform: translateX(10px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          
          .blog-title {
            font-weight: bold;
            transition: color 0.3s ease;
          }
          
          .item-hover .blog-title {
            color: #0070f3;
          }
          
          .blog-date {
            transition: opacity 0.3s ease;
          }
          
          .item-hover .blog-date {
            opacity: 1;
          }
          
          .header-text {
            position: relative;
            display: inline-block;
          }
          
          .header-text:after {
            content: '';
            position: absolute;
            width: 0;
            height: 3px;
            bottom: 0;
            left: 0;
            background-color: #0070f3;
            transition: width 0.5s ease;
          }
          
          .header-text:hover:after {
            width: 100%;
          }
          
          .pulse-animation {
            animation: pulse 2s infinite;
          }
          
          @keyframes pulse {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
            100% {
              transform: scale(1);
            }
          }
        `}</style>
      </Head>

      <section className={`${utilStyles.headingMd} animate-fade-in`}>
        <p className="pulse-animation">
          Welcome to my blog! My name is <strong>Pham Huy Hoang</strong>, a software engineer based in Vietnam.
        </p>
        <p className="animate-fade-in">
          Here is the place where i share my thoughts, experiences, and knowledge about software development, technology, and life in general.
         
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px} animate-fade-in`}>
        <h2 className={`${utilStyles.headingLg} header-text`}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }, index) => (
            <li className={`${utilStyles.listItem} blog-item animate-fade-in`} key={id} style={{ animationDelay: `${index * 0.2}s` }}>
              <Link href={`/posts/${id}`} className="blog-title">
                {title}
              </Link>
              <br />
              <small className={`${utilStyles.lightText} blog-date`}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}