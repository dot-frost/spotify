import { getProviders, signIn } from 'next-auth/react'

function login({ providers }) {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-black">
            <img className="mb-5 w-52" src="https://links.papareact.com/9xl" alt="" />
            {
                Object.values(providers).map(provider=> (
                    <div key={provider.name}>
                        <button className="bg-[#18DB60] text-white p-2 rounded-full"
                        onClick={()=> signIn(provider.id, { callbackUrl: process.env.NEXT_APP_URL + "api/auth/callback/spotify"})}
                        >
                            Login with { provider.name }
                        </button>
                    </div>
                ))
            }
        </div>
    )
}

export default login

export async function getServerSideProps(){
    const providers = await getProviders()

    return {
        props : {
            providers,
        }
    }
}
