import { redirect } from 'next/navigation'
import './globals.scss'

export default function Home() {
    return redirect('/login')
}
