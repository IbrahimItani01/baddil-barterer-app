interface Props {
	alertFor: "username" | "password" | "profilePicture";
	visible: boolean;
	onCancel: () => void;
	onConfirm: (value: string) => void;
}

const CustomAlert = ({ alertFor, visible, onCancel, onConfirm }: Props) => {
	const theme = useAppSelector((state) => state.system.colorScheme);
	const [inputValue, setInputValue] = useState("");
	const [selectedImage, setSelectedImage] = useState("");
	const { userName, profilePictureUrl } = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();
	useEffect(() => {
		if (alertFor === "username") {
			setInputValue(userName ?? "");
		} else if (alertFor === "profilePicture") {
			setInputValue(profilePictureUrl ?? "");
		}
	}, [alertFor, userName, profilePictureUrl]);

	const handleImageSelect = async () => {
		const result = await launchImageLibraryAsync({ mediaTypes: ["images"] });
		if (!result.canceled && result.assets && result.assets.length > 0) {
			const imageUri = result.assets[0].uri;
			setSelectedImage(imageUri);
		}
	};
	const handleCancel = () => {
		// Reset inputs and clear selected image
		setInputValue("");
		setSelectedImage("");
		onCancel(); // Call the provided onCancel handler
	};
	const handleConfirm = () => {
		if (alertFor === "profilePicture" && selectedImage) {
			const fileType = selectedImage.split(".").pop()?.toLowerCase();
			const mimeType = fileType === "png" ? "image/png" : "image/jpeg";
			const fileExtension = mimeType.split("/")[1];

			const fileName = `${Date.now()}.${fileExtension}`;
			const formData = new FormData();

			formData.append("file", {
				uri: selectedImage,
				type: mimeType,
				name: fileName,
			} as unknown as Blob);
			withLoader(dispatch, () => changeProfilePicture(formData));
			onCancel(); // Close the modal after updating
		} else {
			onConfirm(inputValue); // Handle other alerts
		}
	};
