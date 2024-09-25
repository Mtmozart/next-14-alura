import Link from "next/link";
import { CardPost } from "../components/CardPost";
import Logger  from "../logger";
import styles from './page.module.css'

async function getAllPosts(page){
  const resp = await fetch(`http://localhost:3042/posts?_page=${page}&_per_page=6`)
  if(!resp.ok){
    Logger.error('Ops, algo deu errado.');
    return []
    
  }
  Logger.info("Posts obtidos sucesso.")
  return resp.json();
}
//obtém do lado do servidor
export default async function Home({ searchParams }) {
  const currentPage = searchParams?.page || 1
  const { data: posts, prev, next } = await getAllPosts(currentPage)
  return (
    <main className={styles.grid}>
      {posts.map(post =>  <CardPost key={post.id} post={post} />)}
      <div className={styles.links}>
        {prev && <Link href={`/?page=${prev}`}>Página anterior</Link>}
        {next && <Link href={`/?page=${next}`}>Próxima página</Link>}
      </div>
    </main>
  )
}