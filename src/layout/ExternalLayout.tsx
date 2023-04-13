import styles from "@/styles/ExternalLayout.module.css"
import Image from "next/image"

type Props = {
    children: React.ReactNode
}

const ExternalLayout = ({ children }: Props) => {
    return(
        <div className="flex justify-center min-h-screen bg-blue-400">
            <div className="m-auto bg-slate-50 h-3/4 rounded-md mx-2 lg:w-3/5 lg:grid lg:grid-cols-2 mt-10">
                <div className={`hidden lg:block ${styles.imgStyle}`}>
                    <div className={`${styles.cartoonImg}`}><span className="sr-only">image of man with binocular exploring</span></div>
                    <div className={styles.cloud_one}><span className="sr-only">image of a moving cloud</span></div>
                    <div className={styles.cloud_two}><span className="sr-only">image of a moving cloud</span></div>
                </div>
                <div className="flex flex-col justify-evenly">
                    <div className="text-center py-10">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExternalLayout;