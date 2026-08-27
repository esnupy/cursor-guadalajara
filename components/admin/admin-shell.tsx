'use client';

import { ArrowLeftIcon, BaseballCapIcon, GearSixIcon, SignOutIcon, SquaresFourIcon } from '@phosphor-icons/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { AdminQueryProvider } from '@/components/admin/admin-query-provider';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarRail,
	SidebarSeparator,
	SidebarTrigger,
} from '@/components/ui/sidebar';
import { getModulesForRole } from '@/lib/admin/modules';
import type { AdminSession } from '@/lib/auth/types';
import { signOutAction } from '@/modules/admin/access/actions';

const moduleIcons = {
	access: GearSixIcon,
	caps: BaseballCapIcon,
} as const;

export function AdminShell({ session, children }: { session: AdminSession; children: React.ReactNode }) {
	const pathname = usePathname();
	const modules = getModulesForRole(session.role);
	const initials = session.email.slice(0, 2).toUpperCase();

	return (
		<AdminQueryProvider>
			<SidebarProvider>
				<Sidebar>
					<SidebarHeader className="border-b border-sidebar-border px-4 py-4">
						<div className="flex flex-col gap-1">
							<p className="text-sm font-medium">Cursor Guadalajara</p>
							<p className="text-xs text-muted-foreground">Panel de administración</p>
						</div>
					</SidebarHeader>
					<SidebarContent>
						<SidebarGroup>
							<SidebarGroupLabel>Módulos</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu>
									<SidebarMenuItem>
										<SidebarMenuButton asChild isActive={pathname === '/admin'}>
											<Link href="/admin">
												<SquaresFourIcon />
												<span>Inicio</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
									{modules.map((module) => {
										const Icon = moduleIcons[module.id as keyof typeof moduleIcons] ?? GearSixIcon;
										return (
											<SidebarMenuItem key={module.id}>
												<SidebarMenuButton asChild isActive={pathname === module.href}>
													<Link href={module.href}>
														<Icon />
														<span>{module.label}</span>
													</Link>
												</SidebarMenuButton>
											</SidebarMenuItem>
										);
									})}
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					</SidebarContent>
					<SidebarFooter className="border-t border-sidebar-border">
						<div className="flex items-center gap-3 px-2 py-2">
							<Avatar className="size-8">
								<AvatarFallback>{initials}</AvatarFallback>
							</Avatar>
							<div className="min-w-0 flex-1">
								<p className="truncate text-sm font-medium">{session.email}</p>
								<p className="text-xs text-muted-foreground capitalize">{session.role.replace('_', ' ')}</p>
							</div>
						</div>
						<SidebarSeparator />
						<div className="px-2 py-2">
							<SidebarMenuButton asChild>
								<Link href="/">
									<ArrowLeftIcon />
									<span>Volver al sitio</span>
								</Link>
							</SidebarMenuButton>
						</div>
						<SidebarSeparator />
						<form action={signOutAction} className="px-2 py-2">
							<button
								type="submit"
								className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
							>
								<SignOutIcon />
								<span>Cerrar sesión</span>
							</button>
						</form>
					</SidebarFooter>
					<SidebarRail />
				</Sidebar>
				<SidebarInset>
					<header className="flex h-14 items-center gap-2 border-b px-4">
						<SidebarTrigger />
						<p className="text-sm text-muted-foreground">Administración</p>
					</header>
					<div className="flex flex-1 flex-col p-6">{children}</div>
				</SidebarInset>
			</SidebarProvider>
		</AdminQueryProvider>
	);
}
