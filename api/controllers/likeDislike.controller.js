var hello = () => {
	console.log(this);
};

hello.bind(this);
