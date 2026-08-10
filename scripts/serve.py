from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import os
import webbrowser
from urllib.request import urlopen


ROOT = Path(__file__).resolve().parent.parent
HOST = "127.0.0.1"
PORTS = range(4173, 4190)
COURSE_MARKER = "AI Agent 学习实验室".encode("utf-8")


def existing_course_port() -> int | None:
    for port in PORTS:
        try:
            with urlopen(f"http://{HOST}:{port}/index.html", timeout=0.25) as response:
                if COURSE_MARKER in response.read(16_384):
                    return port
        except Exception:
            continue
    return None


def create_server() -> tuple[ThreadingHTTPServer, int]:
    for port in PORTS:
        try:
            return ThreadingHTTPServer((HOST, port), SimpleHTTPRequestHandler), port
        except OSError:
            continue
    raise RuntimeError("4173–4189 端口均被占用，请关闭一个本机预览后重试。")


def main() -> None:
    os.chdir(ROOT)
    running_port = existing_course_port()
    if running_port is not None:
        running_url = f"http://{HOST}:{running_port}/index.html"
        print(f"AI Agent 学习实验室已在运行：{running_url}")
        webbrowser.open(running_url)
        return

    server, selected_port = create_server()
    course_url = f"http://{HOST}:{selected_port}/index.html"
    print(f"AI Agent 学习实验室已打开：{course_url}")
    if selected_port != 4173:
        print(f"提示：4173 正被其他应用使用，本次改用 {selected_port}。请继续通过这个启动器进入同一学习记录。")
    print("学习时请保持这个窗口开启；按 Control-C 可关闭。")
    webbrowser.open(course_url)

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n学习实验室已关闭。")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
