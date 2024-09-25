import Logger from "../../../logger";
import { remark } from "remark";
import html from "remark-html";
import { CardPost } from "../../../components/CardPost";
import styles from './page.module.css'
async function getPostBySlug(slug) {
  const resp = await fetch(`http://localhost:3042/posts?slug=${slug}`);
  if (!resp.ok) {
    Logger.error("Ops, algo deu errado.");
    return {};
  }
  Logger.info("Post obtidos sucesso.");
  const data = await resp.json();
  if (data.length === 0) {
    return {};
  }
  const post = data[0];

  const processedContent = await remark().use(html).process(post.markdown);
  const contentHtml = processedContent.toString();

  post.markdown = contentHtml;

  return post;
}

const PagePost = async ({ params }) => {
  const post = await getPostBySlug(params.slug)
  return (<div>
      <CardPost post={post} highlight />
      <h3 className={styles.subtitle}>Código:</h3>
      <div className={styles.code}>
          <div dangerouslySetInnerHTML={{ __html: post.markdown }} />
      </div>
  </div>)
}

export default PagePost;
