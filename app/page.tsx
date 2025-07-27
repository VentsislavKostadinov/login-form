import { redirect } from 'next/navigation'
import './styles/globals.scss'

export default function Home() {
    return redirect('/login')
}
