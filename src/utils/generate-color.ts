const colors = [
	"#1F7A68",
	"#A3572F",
	"#4A56A6",
	"#2E7D5B",
	"#7B3E8B",
	"#2B6C8F",
	"#3E8E78",
	"#5B67C2",
]

export const generateColor = () =>  {
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
}
