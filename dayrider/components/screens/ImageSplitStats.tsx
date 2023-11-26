/* 交流QQ群:754五七3七7八 */
const stats = [
    {id: 1, name: 'Today\'s tasks', value: '8,000+'},
    {id: 2, name: 'Your productivity score', value: '3%'},
    {id: 3, name: 'Upcoming meetings', value: '9'},
    {id: 4, name: 'Your incoming goal', value: '$70M'},
]

export default function ImageSplitStats() {
    return (
        <div className="relative bg-white">
            <img
                className="object-cover w-full h-56 bg-gray-50 lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-1/2"
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2850&q=80"
                alt=""
            />
            <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
                <div className="px-6 pt-16 pb-24 sm:pb-32 sm:pt-20 lg:col-start-2 lg:px-8 lg:pt-32">
                    <div className="max-w-2xl mx-auto lg:mr-0 lg:max-w-lg">
                        <h2 className="text-base font-semibold text-indigo-600 leading-8">DayRider</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            A clean, compact tool that makes your life easier.
                        </p>
                        <p className="mt-6 text-lg text-gray-600 leading-8">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis
                            suscipit eaque, iste
                            dolor cupiditate blanditiis ratione.
                        </p>
                        <dl className="max-w-xl mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 xl:mt-16">
                            {stats.map((stat) => (
                                <div key={stat.id} className="flex flex-col pl-6 border-l gap-y-3 border-gray-900/10">
                                    <dt className="text-sm text-gray-600 leading-6">{stat.name}</dt>
                                    <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">{stat.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    )
}
