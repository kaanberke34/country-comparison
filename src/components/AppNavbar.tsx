import { Navbar, Button } from 'react-daisyui'
import AppButton from './AppButton'

export default function AppNavbar() {
  return (
    <div className="flex w-full component-preview p-4 items-center justify-center gap-2 font-sans">
    <Navbar>
      <AppButton className="text-xl normal-case" text="Country Comparison" color="ghost"/>
    </Navbar>
  </div>
  )
}
