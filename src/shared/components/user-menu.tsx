import UserAvatar from '@/shared/components/User-avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import { useUserMenu } from '@/shared/components/userUserMenu'

function UserMenu() {

  const {authUser, getInitials, triggerLogout} = useUserMenu()

  const initials = getInitials()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar imageUrl={authUser?.avatarUrl} initials={initials} size='lg' />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel className='text-sm font-semibold text-foreground'>{authUser?.name}</DropdownMenuLabel>
          <DropdownMenuLabel className='text-xs text-muted-foreground'>{authUser?.email}</DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Perfil</DropdownMenuItem>
          <DropdownMenuItem variant='destructive'onClick={triggerLogout}>Sair</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserMenu
