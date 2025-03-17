// CharactersPage.js
const { useState, useEffect, useRef } = React;

const CharactersPage = () => {
    const mountRef = useRef(null);
    const [characters] = useState([
        { name: 'Character 1', description: '첫 번째 캐릭터 설명입니다.' },
        { name: 'Character 2', description: '두 번째 캐릭터 설명입니다.' },
        { name: 'Character 3', description: '세 번째 캐릭터 설명입니다.' }
    ]);
    const [activeCharacter, setActiveCharacter] = useState(0);

    useEffect(() => {
        // Three.js 초기화
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0xf0f0f0);
        mountRef.current.appendChild(renderer.domElement);
        
        // 조명 추가
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(0, 10, 10);
        scene.add(directionalLight);
        
        // 캐릭터 대신 컬러큐브 생성 (실제로는 캐릭터 모델로 대체)
        const cubes = [];
        const colors = [0xff0000, 0x00ff00, 0x0000ff];
        
        colors.forEach((color, index) => {
            const geometry = new THREE.BoxGeometry(1, 2, 1);
            const material = new THREE.MeshStandardMaterial({ color });
            const cube = new THREE.Mesh(geometry, material);
            cube.position.set((index - 1) * 3, 0, 0);
            cube.visible = index === activeCharacter;
            scene.add(cube);
            cubes.push(cube);
        });
        
        // 바닥 추가
        const floorGeometry = new THREE.PlaneGeometry(20, 20);
        const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.position.y = -1;
        scene.add(floor);
        
        camera.position.z = 5;
        camera.position.y = 1;
        
        // 애니메이션 루프
        const animate = () => {
            requestAnimationFrame(animate);
            
            cubes.forEach(cube => {
                cube.rotation.y += 0.01;
            });
            
            renderer.render(scene, camera);
        };
        
        // 화면 크기 변경 처리
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        
        window.addEventListener('resize', handleResize);
        
        // 키보드 이벤트로 캐릭터 전환
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') {
                setActiveCharacter(prev => (prev > 0 ? prev - 1 : characters.length - 1));
            } else if (e.key === 'ArrowRight') {
                setActiveCharacter(prev => (prev < characters.length - 1 ? prev + 1 : 0));
            }
        };
        
        window.addEventListener('keydown', handleKeyDown);
        
        // 활성 캐릭터가 변경될 때마다 큐브 가시성 업데이트
        cubes.forEach((cube, index) => {
            cube.visible = index === activeCharacter;
        });
        
        animate();
        
        // 클린업
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('keydown', handleKeyDown);
            mountRef.current.removeChild(renderer.domElement);
        };
    }, [activeCharacter, characters.length]);

    // 활성 캐릭터가 변경될 때 실행
    useEffect(() => {
        const mountNode = mountRef.current;
        
        if (mountNode) {
            const canvases = mountNode.querySelectorAll('canvas');
            if (canvases.length > 1) {
                // 마지막 캔버스만 남기고 모두 제거
                for (let i = 0; i < canvases.length - 1; i++) {
                    mountNode.removeChild(canvases[i]);
                }
            }
        }
    }, [activeCharacter]);

    return (
        <div className="characters-page">
            <div ref={mountRef} className="three-canvas"></div>
            <div className="characters-description">
                <h2>{characters[activeCharacter].name}</h2>
                <p>{characters[activeCharacter].description}</p>
                <div className="navigation">
                    <button onClick={() => setActiveCharacter(prev => (prev > 0 ? prev - 1 : characters.length - 1))}>
                        이전 캐릭터
                    </button>
                    <button onClick={() => setActiveCharacter(prev => (prev < characters.length - 1 ? prev + 1 : 0))}>
                        다음 캐릭터
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CharactersPage;
