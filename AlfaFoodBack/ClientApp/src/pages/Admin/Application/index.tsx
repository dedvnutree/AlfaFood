import React, {ChangeEvent, useEffect, useRef, useState} from "react"
import {withRouter, RouteComponentProps } from "react-router";
import { Link , useHistory} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";

import { ReadonlyFieldTextarea, ReadonlyFieldInput, ReadonlyFieldTime} from "../../common/components/Fields";
import useDocumentTitle from "../../../hooks/useDocumentTitle";
import { days as daysName } from "../../../utils/diff"
import {confirmApplication, getApplication} from "../../../redux/reducers/applicationsReducer";



import "./index.scss"
import {AppStateType} from "../../../redux/store";



interface MatchParams {
    id: string;
}

interface IApplicationProps {
    data?: {
        name: string,
        description: string,
        address: string,
        businessId: string,
        email: string,

    }
}




const Application = ({match} : RouteComponentProps<MatchParams>) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const currentApplication = useSelector((state: AppStateType) => state.applications.currentApplication)
    const {description,name, address, email, businessId, workingTime, imageMap} = currentApplication
    // const daysWork = workingTime ? JSON.parse(workingTime) : []

    const daysWork: [string, string][] = []
    const [svgData, setSvgData] = useState('')
    const [pathTagg, setPathTag] = useState(null)
    const [tooltip, setTooltip] = useState('')
    const [tables, addTables] = useState<{name: string, id: string}[]>([])
    const tableNameRef = useRef()
    const tableIdRef = useRef()
    const fileImageRef = useRef(null)
    //@ts-ignore
    let tooltipElem;

    document.onmouseover = function(event) {
        let target = event.target;

        //@ts-ignore
        let tooltipHtml = target.id;
        if (!tooltipHtml) return;


        tooltipElem = document.createElement('div');
        tooltipElem.className = 'tooltip';
        tooltipElem.innerHTML = tooltipHtml;
        // var tooltipRoot = document.querySelector(".adminApplication__tooltip")
        //@ts-ignore
        // tooltipRoot.appendChild(tooltipElem);
        setTooltip(String(tooltipHtml))

    };



    const handleFiles = (files: any) => {
        let reader = new FileReader();

        reader.onload = function(e: ProgressEvent<FileReader>) {
            //@ts-ignore
            var svgData = e.target.result;
            var parser = new DOMParser();
            //@ts-ignore
            var doc = parser.parseFromString(svgData, "image/svg+xml");
            var pathTags = doc.getElementsByTagName("path");

            if (pathTags[0]) {
                //@ts-ignore
                console.log(typeof(pathTags))
                console.log(pathTags)

                for (let i = 0; i < pathTags.length; i++) {
                    //@ts-ignore
                    pathTags[i].setAttribute('toolFtip', "эта подсказка должна быть длиннее, чем элемент")
                }
                //@ts-ignore
                setPathTag(pathTags[0])
            }

            var svgTags = doc.getElementsByTagName("svg");
            setSvgData(String(svgData))
            // setImageTag()
        }
        reader.readAsText(files[0]);
    }

    const id = match.params.id
    console.log('image::: ', imageMap)

    useEffect(() => {
        console.log('dispatch get application')
        dispatch(getApplication(id))
    }, [id])

    const handleSubmit = async () => {
        //@ts-ignore
        let res_data = new FormData()
        //@ts-ignore
        res_data.append('file', fileImageRef.current.files[0])
        await dispatch(confirmApplication(res_data, tables))
        //clear
        addTables([])
        //@ts-ignore
        fileImageRef.current.value = ""
        history.push('/')
    }
    return (
        <section className="adminApplication__section">
            <h3>Заявка  № {match.params.id}</h3>
            {/*@ts-ignore*/}

            <div className="adminApplication__form">
                <div className="adminApplication__form-block">
                    <h4 className="adminApplication__small-title">Основные данные</h4>
                    <ReadonlyFieldInput
                        value={name}
                        label="Название"
                        type="text"
                    />
                    <ReadonlyFieldInput
                        value={businessId}
                        label="БизнесИД"
                        type="text"
                    />
                    <ReadonlyFieldInput
                        value={address}
                        label="Адресс"
                        type="text"
                    />
                    <ReadonlyFieldTextarea
                        value={description}
                        label="Описание"
                        type="text"
                    />
                </div>
                <div
                    className="adminApplication__form-block"
                >
                    {Boolean(daysWork.length) && <h4 className="adminApplication__small-title">Время работы</h4>}
                    <div
                        className="adminApplication-pickerTime__wrapper"
                    >
                        { daysWork && daysWork.map((day: [string, string], i:number) => (
                            <div
                                className="adminApplication-pickerTime__date"
                            >
                                <span>{daysName[i]}</span>
                                <ReadonlyFieldTime value={day[0]} />
                                <ReadonlyFieldTime value={day[1]} />
                            </div>
                        ))}
                    </div>
                </div>
                <div
                    className="adminApplication__form-block"
                >
                    <p>plan.jpg</p>
                    <a href={`data:image/png;base64, ${imageMap}`}>Скачать план </a>
                </div>
            </div>


            <div
                className="adminApplication__confirmation"
            >
              <div
                  className="adminApplication__upload"
              >
                  <input
                      //@ts-ignore
                      ref={fileImageRef}
                      className="adminApplication__file-upload"
                      type="file"
                      // id="file-input"
                      accept="image/svg+xml"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => handleFiles(e.target.files)}
                  />
                  {/*@ts-ignore*/}
                  <div
                      className="adminApplication__content"
                      dangerouslySetInnerHTML={{__html: svgData}}
                  ></div>

                  <div className="adminApplication__buttons">
                      <button
                          onClick={handleSubmit}
                          data-tooltip="эта подсказка длиннее, чем элемент"
                          className="adminApplication__btn adminApplication__btn--main"
                      >СОХРАНИТЬ</button>
                      <Link
                          to={"/chat"}
                      >
                          <button
                              className="adminApplication__btn adminApplication__btn--secondary"
                          >ПЕРЕЙТИ В ЧАТ</button>
                      </Link>

                  </div>
              </div>


                <div
                    className="adminApplication__marking-tables"
                >
                    <div>
                        <span>В последний момент вы навели на (id элемента)</span>
                        <div
                            // id="tooltip-root"
                            className="adminApplication__tooltip"
                            dangerouslySetInnerHTML={{__html: tooltip}}
                        ></div>
                        <h3
                            className="adminApplication__tables-title"
                        >Список столов</h3>
                        <ol
                            className="adminApplication__tables-list"
                        >
                            {tables.map((table, i) => (
                                <li>{i + 1}) {table.name} - {table.id}</li>
                            ))}
                        </ol>
                        <div className="addTable__wrapper">
                            <input
                                //@ts-ignore
                                ref={tableNameRef}
                                placeholder="name"
                                type="text"
                                className="addTable__name"
                            />
                            <input
                                //@ts-ignore
                                ref={tableIdRef}
                                placeholder="id"
                                type="text"
                                className="addTable__id"
                            />
                            <button

                                onClick={() => {
                                    //@ts-ignore
                                    if (tableIdRef.current.value &&  tableNameRef.current.value) {
                                        //@ts-ignore
                                        console.log('pre add tables::: ', tableIdRef.current.value )
                                        //@ts-ignore
                                        let name = tableNameRef.current.value
                                        //@ts-ignore
                                        let id = tableIdRef.current.value

                                        addTables(prevState => [...prevState, {name, id }])
                                    }
                                    //@ts-ignore
                                    tableIdRef.current.value = ""
                                    //@ts-ignore
                                    tableNameRef.current.value = ""
                                }}
                                className="addTable__btn"
                            >Добавить</button>
                        </div>

                    </div>
                </div>
           </div>

        </section>
    )
}



export default withRouter(Application)