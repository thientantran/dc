'use client'
import CreateServerModal from '@/components/create-server-modal';
import { useEffect, useState } from 'react';
import EditServerModal from './edit-server-modal';
import InviteModal from './invite-modal';

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
    </>
  )
}
