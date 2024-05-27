export const Pizza = () => {
    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-6">Доставка пиццы</h1>
            <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Capitan Shaverma</h2>
                    <div className="flex items-center">
                        <span className="text-sm text-gray-500 ml-1">35–45 мин</span>
                        <span className="text-sm text-gray-500 ml-1">Шаурма Пицца</span>
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                    <div className="flex flex-col items-center">
                        <img
                            alt="Пицца Чоризо с беконом"
                            className="mb-2 rounded-lg"
                            height="120"
                            src="https://generated.vusercontent.net/placeholder.svg"
                            style={{
                                aspectRatio: "120/120",
                                objectFit: "cover",
                            }}
                            width="120"
                        />
                        <div className="text-lg font-semibold">720Р</div>
                        <div className="text-sm text-gray-500 mb-2">Пицца Чоризо с беконом</div>
                        <div className="text-sm text-gray-500 mb-4">627 г</div>
                        <button className="w-full">Заказать</button>
                    </div>
                    <div className="flex flex-col items-center">
                        <img
                            alt="Пицца Дьябло"
                            className="mb-2 rounded-lg"
                            height="120"
                            src="https://generated.vusercontent.net/placeholder.svg"
                            style={{
                                aspectRatio: "120/120",
                                objectFit: "cover",
                            }}
                            width="120"
                        />
                        <div className="text-lg font-semibold">740Р</div>
                        <div className="text-sm text-gray-500 mb-2">Пицца Дьябло</div>
                        <div className="text-sm text-gray-500 mb-4">654 г</div>
                        <button className="w-full">Заказать</button>
                    </div>
                    <div className="flex flex-col items-center">
                        <img
                            alt="Пицца Тропическая"
                            className="mb-2 rounded-lg"
                            height="120"
                            src="https://generated.vusercontent.net/placeholder.svg"
                            style={{
                                aspectRatio: "120/120",
                                objectFit: "cover",
                            }}
                            width="120"
                        />
                        <div className="text-lg font-semibold">685Р</div>
                        <div className="text-sm text-gray-500 mb-2">Пицца Тропическая</div>
                        <div className="text-sm text-gray-500 mb-4">650 г</div>
                        <button className="w-full">Заказать</button>
                    </div>
                    <div className="flex flex-col items-center">
                        <img
                            alt="Пицца Жюльен"
                            className="mb-2 rounded-lg"
                            height="120"
                            src="https://generated.vusercontent.net/placeholder.svg"
                            style={{
                                aspectRatio: "120/120",
                                objectFit: "cover",
                            }}
                            width="120"
                        />
                        <div className="text-lg font-semibold">740Р</div>
                        <div className="text-sm text-gray-500 mb-2">Пицца Жюльен</div>
                        <div className="text-sm text-gray-500 mb-4">700 г</div>
                        <button className="w-full">Заказать</button>
                    </div>
                    <div className="flex flex-col items-center">
                        <img
                            alt="Пицца Гриша Добрыло"
                            className="mb-2 rounded-lg"
                            height="120"
                            src="https://generated.vusercontent.net/placeholder.svg"
                            style={{
                                aspectRatio: "120/120",
                                objectFit: "cover",
                            }}
                            width="120"
                        />
                        <div className="text-lg font-semibold">720Р</div>
                        <div className="text-sm text-gray-500 mb-2">Пицца Гриша Добрыло</div>
                        <div className="text-sm text-gray-500 mb-4">615 г</div>
                        <button className="w-full">Заказать</button>
                    </div>
                </div>
            </div>
        </div>
    )
}