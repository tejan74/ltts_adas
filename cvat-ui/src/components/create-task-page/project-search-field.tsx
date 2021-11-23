// Copyright (C) 2019-2021 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React, { useEffect, useState } from 'react';
import Autocomplete from 'antd/lib/auto-complete';
import { SelectValue } from 'antd/lib/select';

import getCore from 'cvat-core-wrapper';

const core = getCore();

type Props = {
    value: number | null;
    onSelect: (id: number | null,project_type:string|'') => void;
    filter?: (value: Project, index: number, array: Project[]) => unknown;

};

type Project = {
    id: number;
    name: string;
    project_type: string;
};

export default function ProjectSearchField(props: Props): JSX.Element {
    const { value, filter, onSelect,} = props;
    const [searchPhrase, setSearchPhrase] = useState('');
    const [projects, setProjects] = useState<Project[]>([]);
    const handleSearch = (searchValue: string): void => {
        core.projects.searchNames(searchValue).then((result: Project[]) => {
            if (result) {
                setProjects(result);
            }
        });
        setSearchPhrase(searchValue);
         onSelect(null,'');
    };

    const handleFocus = (open: boolean): void => {
        if (!projects.length && open) {
            core.projects.searchNames().then((result: Project[]) => {
                let projectsResponse = result;
                if (typeof filter === 'function') {
                    projectsResponse = projectsResponse.filter(filter);
                }
                if (projectsResponse) {
                    setProjects(projectsResponse);
                }
            });
        }
        if (!open && !value && searchPhrase) {
            // setSearchPhrase('');
        }
    };

    const handleSelect = (_value: SelectValue): void => {
       let project_display =  projects.filter((proj) => proj.id === +_value)[0].name;
       let project_type = projects.filter((proj) => proj.id === +_value)[0].project_type
         setSearchPhrase(project_display+'_'+ project_type);
        if(_value){
            onSelect(+_value, project_type)
        }else{
            onSelect(null,'')
        }
        //  onSelect(_value ? +_value  : null);
    };

    useEffect(() => {
        if (value) {
            if (!projects.filter((project) => project.id === value).length) {
                core.projects.get({ id: value }).then((result: Project[]) => {
                    const [project] = result;
                    setProjects([
                        ...projects,
                        {
                            id: project.id,
                            name: project.name,
                            project_type:project.project_type
                        },
                    ]);
                    let project_display = project.name + '_' + project.project_type
                    setSearchPhrase(project_display);
                    onSelect(project.id,project.project_type);
                });
            }
        } else {
            setSearchPhrase('');
        }
    }, [value]);

    return (
        <Autocomplete
            value={searchPhrase}
            placeholder='Select project'
            onSearch={handleSearch}
            onSelect={handleSelect}
            className='cvat-project-search-field'
            onDropdownVisibleChange={handleFocus}
            options={projects.map((proj) => ({
                value: proj.id.toString(),
                label: proj.name + '_' +  proj.project_type,
            }))}
        />
    );
}
