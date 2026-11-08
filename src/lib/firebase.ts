/**
 * Acesso ao Firebase (login com Google ou e-mail/senha, e Firestore). Carregado
 * à parte na abertura do app, para a primeira tela aparecer sem esperar por ele.
 *
 * A configuração abaixo é pública por natureza (vai no site de qualquer forma);
 * quem protege os dados são as regras do Firestore: cada conta só lê e grava
 * o documento usuarios/{uid}.
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

const app = initializeApp({
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

export type Usuario = Pick<User, 'uid' | 'displayName' | 'email'>

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
  return { uid: user.uid, displayName: nome || null, email: user.email }
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
