/**
 * Acesso ao Firebase (login com Google e Firestore). Este módulo só é carregado
 * quando a pessoa entra na conta, para não pesar o site de quem não sincroniza.
 *
 * A configuração abaixo é pública por natureza (vai no site de qualquer forma);
 * quem protege os dados são as regras do Firestore: cada conta só lê e grava
 * o documento usuarios/{uid}.
 */
import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup, signOut, type User } from 'firebase/auth'
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore/lite'

const app = initializeApp({
  apiKey: 'AIzaSyBfJMwoRy1GBlDHCrOQSSfrvRdQMd0clzM',
  authDomain: 'xadrez-aberturas.firebaseapp.com',
  projectId: 'xadrez-aberturas',
  storageBucket: 'xadrez-aberturas.firebasestorage.app',
  messagingSenderId: '925126172066',
  appId: '1:925126172066:web:87c07eef8175f2f7be26fb',
})

const auth = getAuth(app)
const banco = getFirestore(app)

export type Usuario = Pick<User, 'uid' | 'displayName' | 'email'>

export function observarUsuario(aoMudar: (usuario: Usuario | null) => void): void {
  onAuthStateChanged(auth, aoMudar)
}

export async function entrarComGoogle(): Promise<void> {
  const provedor = new GoogleAuthProvider()
  provedor.setCustomParameters({ prompt: 'select_account' })
  await signInWithPopup(auth, provedor)
}

export async function sairDaConta(): Promise<void> {
  await signOut(auth)
}

/** Texto JSON do progresso guardado na nuvem, ou null se ainda não há nada. */
export async function lerDaNuvem(uid: string): Promise<string | null> {
  const instantaneo = await getDoc(doc(banco, 'usuarios', uid))
  const dados = instantaneo.data()
  return typeof dados?.progresso === 'string' ? dados.progresso : null
}

export async function gravarNaNuvem(uid: string, progresso: string): Promise<void> {
  await setDoc(doc(banco, 'usuarios', uid), { progresso, atualizado: new Date().toISOString(), versao: 1 })
}
