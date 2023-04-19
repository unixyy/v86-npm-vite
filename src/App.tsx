import React, { useEffect, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";
// import { V86Starter } from "v86";
import { v86WASM, seabios, vgabios } from "v86/build/binaries";

import v86Wasm from "v86/build/v86.wasm";
// import bios from "v86/bios/seabios.bin?url";
// import vgabios from "v86/bios/vgabios.bin?url";
import cdrom from "./images/linux.iso";

import "./assets/libv86.js";

function App() {
  const divRef = useRef<HTMLElement>();


  useEffect(() => {
    async function main() {
      new V86Starter({
        wasm_fn: async (param: any) =>
          (await WebAssembly.instantiate(await v86WASM, param))
            .instance.exports,
        memory_size: 512 * 1024 * 1024,
        vga_memory_size: 8 * 1024 * 1024,
        screen_container: divRef.current,
        bios: { buffer: await seabios },
        vga_bios: { buffer: await vgabios },
        cdrom: { url: cdrom },
        autostart: true,
      });
    }
    main();
    // async function arch() {
    //   const v86 = new V86Starter({
    //     wasm_path: "v86.wasm",
    //     bios: { url: "seabios.bin" },
    //     vga_bios: { url: "vgabios.bin" },
    //     memory_size: 512 * 1024 * 1024,
    //     vga_memory_size: 8 * 1024 * 1024,
    //     screen_container: divRef.current,
    //     filesystem: {
    //       baseurl: "../images/arch",
    //       basefs: "../images/fs.json",
    //     },
    //     autostart: true,
    //     bzimage_initrd_from_filesystem: true,
    //     cmdline: [
    //       "rw",
    //       "root=host9p rootfstype=9p rootflags=trans=virtio,cache=loose",
    //       "init=/usr/bin/init-openrc",
    //       ].join(" "),
    //   });
    // }
    // arch();


  }, []);

  return (
    <div ref={divRef}>
        <div
          style={{
            whiteSpace: "pre",
            font: "14px monospace",
            lineHeight: 1,
          }}
        ></div>
        <canvas id={"vga"}></canvas>
    </div>
  );
}

export default App;
