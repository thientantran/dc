'use client'
import CreateServerModal from '@/components/create-server-modal';
import { useEffect, useState } from 'react';
import CreateChannleModal from './create-channel-modal';
import DeleteChannelModal from './delete-channel-modal';
import DeleteServerModal from './delete-server-modal';
import EditServerModal from './edit-server-modal';
import InviteModal from './invite-modal';
import LeaveServerModal from './leave-server-modal';
import MembersModal from './members-modal';

export default function ModalProvider() {

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [])

  if (!isMounted) return null;

  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <MembersModal />
      <CreateChannleModal />
      <LeaveServerModal />
      <DeleteServerModal />
      <DeleteChannelModal />
    </>
  )
}
