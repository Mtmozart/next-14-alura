import Image from "next/image"
import styles from './avatar.module.css'
export const Avatar = ({name, imagemSrc}) => {
  return (
    <ul className={styles.avatar}>
      <li>
       <Image src={imagemSrc} width={32} height={32} alt={`Avatar do(a) ${name}`} />
      </li>
      <li>
        @{name}
      </li>
      
    </ul>
  )
}