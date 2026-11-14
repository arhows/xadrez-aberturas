/**
 * Acesso ao Firebase (login com Google ou e-mail/senha, e Firestore). Carregado
 * à parte na abertura do app, para a primeira tela aparecer sem esperar por ele.
 *
 * A configuração abaixo é pública por natureza (vai no site de qualquer forma);
 * quem protege os dados são as regras do Firestore: cada conta só lê e grava
 * o documento usuarios/{uid}, e só o dono grava o próprio perfis/{uid} (foto ou avatar).
 */
import { initializeApp } from 'firebase/app'
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type User,
} from 'firebase/auth'
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore/lite'

export const app = initializeApp({
  apiKey: 'AIzaSyBfJMwoRy1GBlDHCrOQSSfrvRdQMd0clzM',
  authDomain: 'xadrez-aberturas.firebaseapp.com',
  projectId: 'xadrez-aberturas',
  storageBucket: 'xadrez-aberturas.firebasestorage.app',
  messagingSenderId: '925126172066',
  appId: '1:925126172066:web:87c07eef8175f2f7be26fb',
})

const auth = getAuth(app)
// E-mails de redefinição de senha em português.
auth.languageCode = 'pt-BR'
const banco = getFirestore(app)

export type Usuario = Pick<User, 'uid' | 'displayName' | 'email' | 'photoURL'>

export function observarUsuario(aoMudar: (usuario: Usuario | null) => void): void {
  onAuthStateChanged(auth, aoMudar)
}

export async function entrarComGoogle(): Promise<void> {
  const provedor = new GoogleAuthProvider()
  provedor.setCustomParameters({ prompt: 'select_account' })
  await signInWithPopup(auth, provedor)
}

export async function entrarComEmail(email: string, senha: string): Promise<void> {
  await signInWithEmailAndPassword(auth, email, senha)
}

/** Cria a conta e já entra nela. */
export async function cadastrarComEmail(nome: string, email: string, senha: string): Promise<Usuario> {
  const { user } = await createUserWithEmailAndPassword(auth, email, senha)
  if (nome) await updateProfile(user, { displayName: nome })
  return { uid: user.uid, displayName: nome || null, email: user.email, photoURL: null }
}

export async function enviarRedefinicaoDeSenha(email: string): Promise<void> {
  await sendPasswordResetEmail(auth, email)
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

/** Foto ou avatar de uma conta (perfis/{uid}); qualquer conta lê, só o dono grava. */
export interface PerfilPublico {
  /** Foto enviada (data URL de 128×128) ou a foto da conta Google (https). */
  foto: string | null
  /** Avatar escolhido entre os do app (id em lib/perfil.ts). */
  avatar: string | null
}

export async function lerPerfil(uid: string): Promise<PerfilPublico | null> {
  const dados = (await getDoc(doc(banco, 'perfis', uid))).data()
  if (!dados) return null
  return {
    foto: typeof dados.foto === 'string' ? dados.foto : null,
    avatar: typeof dados.avatar === 'string' ? dados.avatar : null,
  }
}

export async function gravarPerfil(uid: string, perfil: PerfilPublico): Promise<void> {
  await setDoc(doc(banco, 'perfis', uid), { foto: perfil.foto, avatar: perfil.avatar, atualizado: new Date().toISOString() })
}
